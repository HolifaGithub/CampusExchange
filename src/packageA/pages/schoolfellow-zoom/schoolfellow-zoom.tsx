import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image,ScrollView } from '@tarojs/components'
import { ClAccordion, ClTextarea, ClButton, ClCard, ClDivider } from "mp-colorui"
import { AtToast, AtActivityIndicator } from 'taro-ui'
import getSystemInfo from '../../../utils/getSystemInfo'
import promiseApi from '../../../utils/promiseApi'
import { server, port, protocol } from '../../../static-name/server'
import transformDateToBefore from '../../../utils/transformDateToBefore'
import './schoolfellow-zoom.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}
interface PublishListDatas {
  id: number;
  avatarUrl: string;
  nickName: string;
  publishContent: string;
  time: string;
}
type PageState = {
  isPublish: boolean;
  publishedContent: string;
  publishListDatas: PublishListDatas[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SchoolfellowZoom {
  props: IProps;
}

class SchoolfellowZoom extends Component {
  config: Config = {
    navigationBarTitleText: '校友圈',
    enablePullDownRefresh: false,
    navigationBarBackgroundColor: '#e54d42',
    navigationBarTextStyle: 'white'
  }
  state = {
    isPublish: true,
    publishedContent: '',
    publishListDatas: [],
    page: 1,
    isShowToast: false,
    loadMore: false,
    hasMore: true
  }
  pageSize = 6
  title = '发表日志'
  publishHeight = 400
  placeholder = '向校友分享点什么吧...'
  _publishContent = ''
  onPublishClick() {
    this.setState({ publishedContent: this._publishContent }, () => {
      promiseApi(Taro.login)().then((loginResult) => {
        if (loginResult.code) {
          promiseApi(Taro.request)({
            url: `${protocol}://${server}:${port}/publishschoolfellowzoom`,
            method: 'POST',
            data: {
              code: loginResult.code,
              publishContent: this.state.publishedContent
            }
          }).then(res => {
            if (res.statusCode === 200 && res.data.status === 'success') {
              this.setState({ isShowToast: true,publishedContent:''})
              this.fetchSchoolfellowListDatas()
            }
          })
        }
      })
    })
  }
  onpublishChange(value) {
    this._publishContent = value
  }
  fetchSchoolfellowListDatas() {
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getshschoolfellowzoomlist`,
          method: 'GET',
          data: {
            code: loginResult.code,
            page: 1
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length < this.pageSize) {
              this.setState({
                hasMore: false,
                publishListDatas: res.data.returnDatas
              })
            } else {
              this.setState({
                publishListDatas: res.data.returnDatas
              })
            }
          }
        })
      }
    })
  }
  fetchMore() {
    this.setState({ loadMore: true })
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getshschoolfellowzoomlist`,
          method: 'GET',
          data: {
            code: loginResult.code,
            page: ++this.state.page
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length < this.pageSize) {
              this.setState((prevState: PageState) => {
                return {
                  hasMore: false,
                  loadMore: false,
                  publishListDatas: prevState.publishListDatas.concat(res.data.returnDatas)
                }
              })
            } else {
              this.setState((prevState: PageState) => {
                return {
                  loadMore: false,
                  publishListDatas: prevState.publishListDatas.concat(res.data.returnDatas)
                }
              })
            }
          }
        })
      }
    })
  }
  componentWillMount() {
    this.fetchSchoolfellowListDatas()
  }
  // componentWillUpdate(){
  //   this.fetchSchoolfellowListDatas()
  // }
  render() {
    const { isPublish, publishedContent, publishListDatas, isShowToast,loadMore,hasMore } = this.state
    const windowHeight = getSystemInfo().windowHeight+'px'
    return (
      <ScrollView className='schoolfellow-zoom' enableFlex scrollY onScrollToLower={()=>{
        if(this.state.hasMore){
          this.fetchMore()
        }
      }} style={{height:windowHeight}}>
        <ClAccordion
          title={this.title}
          open={isPublish}
          animation={true}
          height={this.publishHeight}
        >
          <ClTextarea showLengthTip maxLength={200} bgColor='light-white' placeholder={this.placeholder} value={publishedContent} onChange={(value) => { this.onpublishChange(value) }} />
          <ClButton shape='round' bgColor='red' long onClick={() => { this.onPublishClick() }}>发表</ClButton>
        </ClAccordion>
        <View>
          {publishListDatas && publishListDatas.length > 0 ? (publishListDatas.map((data) => {
            const { id, avatarUrl, nickName, publishContent, time } = data
            const transformDate = transformDateToBefore(time)
            return (<View className='publish-item-container' key={id}>
              <ClCard
                bgColor="white"
              >
                <View className='publish-item'>
                  <Image src={avatarUrl} className='avatar'></Image>
                  <View className='nick-name'>{nickName}</View>
                </View>
                <View className='publish-content'>
                  {publishContent}
                </View>
                <View className='time'>{transformDate}</View>
              </ClCard>
            </View>)
          })) : null}
        </View>
        <AtToast isOpened={isShowToast} text={'发表成功!'} status='success' duration={1000}></AtToast>
        {loadMore ? <View className='loading'>
          <AtActivityIndicator content='加载中...' color='#e54d42' mode='center' size={36}></AtActivityIndicator>
        </View> : null}
        {hasMore ? null : <ClDivider color='gray'>没有更多了！</ClDivider>}
      </ScrollView>
    )
  }
}

export default SchoolfellowZoom as ComponentClass<PageOwnProps, PageState>
