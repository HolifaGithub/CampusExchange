import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../utils/getSystemInfo'
import promiseApi from '../../utils/promiseApi'
import SearchContent from '../../components/component-search'
import { server, port, protocol } from '../../static-name/server'
import './search.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}
type WaterFallDatasType = {
  orderId: string;
  nameInput: string;
  newAndOldDegree: string;
  mode: string;
  objectOfPayment: string;
  payForMePrice: number;
  payForOtherPrice: number;
  wantExchangeGoods: string;
  topPicSrc: string;
  watchedPeople: number;
  nickName: string;
  avatarUrl: string;
}
type PageState = {
  waterFallDatas: WaterFallDatasType[][];
  loadMore: boolean;
  page: number;
  hasMore: boolean;
}
type PageOwnProps = {}


type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Search {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Search extends Component {
  config: Config = {
    navigationBarTitleText: '商品搜索页'
  }
  state = {
    loadMore: false,
    page: 1,
    hasMore: true,
    waterFallDatas: [],
    value: ''
  }
  pageSize = 6
  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  fetchSearchData(value,searchStart) {
    this.setState({ value: value })
    return new Promise((resolve, reject) => {
      promiseApi(Taro.request)({
        url: `${protocol}://${server}:${port}/search`,
        method: 'GET',
        data: {
          value: value,
          page: 1,
          searchStart:searchStart
        }
      }).then(res => {
        resolve(res)
      })
    })
  }
  fetchMore() {
      this.setState({ loadMore: true })
      promiseApi(Taro.request)({
        url: `${protocol}://${server}:${port}/search`,
        method: 'GET',
        data: {
          value: this.state.value,
          page: ++this.state.page
        }
      }).then(res => {
        if (res.statusCode === 200 && res.data.status === 'success') {
          if (res.data.returnDatas.length < this.pageSize) {
            this.setState((prevState: PageState) => {
              return {
                hasMore: false,
                loadMore: false,
                waterFallDatas: prevState.waterFallDatas.concat([res.data.returnDatas])
              }
            })
          } else {
            this.setState((prevState: PageState) => {
              return {
                loadMore: false,
                waterFallDatas: prevState.waterFallDatas.concat([res.data.returnDatas])
              }
            })
          }
        } else {
          this.setState({ 
            hasMore: false,
            loadMore:false
          })
        }
      })
  }
  componentWillPreload(params) {
    return this.fetchSearchData(params.value,params.searchStart)
  }
  componentWillMount() {
    this.$preloadData
      .then(res => {
        if (res.statusCode === 200 && res.data.status === 'success') {
          if (res.data.returnDatas.length < this.pageSize) {
            this.setState({
              hasMore: false,
              waterFallDatas: [res.data.returnDatas]
            })
          } else {
            this.setState({
              waterFallDatas: [res.data.returnDatas]
            })
          }
        } else {
          this.setState({ hasMore: false })
        }
      })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    const windowHeight = getSystemInfo().windowHeight+'px'
    return (
      <ScrollView className='search' enableFlex scrollY onScrollToLower={()=>{
        if(this.state.hasMore){
          this.fetchMore()
        }
      }} style={{height:windowHeight}}>
        <SearchContent datas={this.state.waterFallDatas} hasMore={this.state.hasMore} loadMore={this.state.loadMore} />
      </ScrollView>
    )
  }
}

export default Search as ComponentClass<PageOwnProps, PageState>
