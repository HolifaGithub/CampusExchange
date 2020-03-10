import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import getSystemInfo from '../../utils/getSystemInfo'
import { server, port, protocol } from '../../static-name/server'
import promiseApi from '../../utils/promiseApi'
import { AtActivityIndicator } from "taro-ui"
import NotFound from '../../components/componnent-not-found'
import { connect } from '@tarojs/redux'
import ChatList from '../../components/component-chat-list'
import './chat.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

interface ChatListReturnDatas {
  avatarUrl: string;
  nickName: string;
  topPicSrc: string;
  lastChatContent: string;
  lastChatTime: string;
  orderId: string;
}
type PageState = {
  page: number;
  hasMore: boolean;
  loadMore: boolean;
  chatListDatas: ChatListReturnDatas[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Chat {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Chat extends Component {
  constructor(props) {
    super(props)
  }
  config: Config = {
    navigationBarTitleText: '聊天列表',
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white'
  }
  pageSize = 8
  state = {
    page: 1,
    hasMore: true,
    loadMore: false,
    chatListDatas: [],
  }
  componentWillMount() {
    promiseApi(Taro.login)().then((loginResult) => {
      const code = loginResult.code
      if (code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getchatlist`,
          method: 'GET',
          data: {
            code: code,
            page: 1
          }
        }).then((res) => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length === this.pageSize) {
              this.setState({
                chatListDatas: res.data.returnDatas,
                hasMore: true,
              })
            } else {
              this.setState({
                hasMore: false,
                chatListDatas: res.data.returnDatas
              })
            }
          }
        })
      }
    })
  }

  onScrollToLower() {
    this.setState({ loadMore: true })
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getchatlist`,
          method: 'GET',
          data: {
            code: loginResult.code,
            page: ++this.state.page
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length === this.pageSize) {
              this.setState((prevState: PageState) => {
                return {
                  hasMore: true,
                  loadMore: false,
                  chatListDatas: prevState.chatListDatas.concat(res.data.returnDatas)
                }
              })
            } else {
              this.setState({
                hasMore: false,
                loadMore: false,
              })
            }
          }
        })
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { chatListDatas, loadMore, hasMore } = this.state
    const windowHeight = (getSystemInfo().windowHeight - getSystemInfo().tabBarHeight) + 'px'
    return (
      <ScrollView className='chat' enableFlex scrollY style={{ height: windowHeight }} onScrollToLower={() => {
        if (hasMore) {
          this.onScrollToLower()
        }
      }}>
        {(chatListDatas && chatListDatas.length > 0) ? (<ChatList datas={chatListDatas} />) : <NotFound />}
        {loadMore ? <View className='loading'>
          <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
        </View> : null}
        {hasMore ? null : <View className='not-more'>----------- 没有更多了！-----------</View>}
      </ScrollView>
    )
  }
}

export default Chat as ComponentClass<PageOwnProps, PageState>
