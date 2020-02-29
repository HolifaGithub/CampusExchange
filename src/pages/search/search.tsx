import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../utils/getSystemInfo'
import promiseApi from '../../utils/promiseApi'
import SearchContent from '../../components/component-search'
import { server, port, protocol } from '../../static-name/server'
import './search.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

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

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
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

  fetchSearchData(value) {
    this.setState({ value: value })
    return new Promise((resolve, reject) => {
      promiseApi(Taro.request)({
        url: `${protocol}://${server}:${port}/search`,
        method: 'GET',
        data: {
          value: value,
          page: 1
        }
      }).then(res => {
        resolve(res)
      })
    })
  }
  fetchMore() {
    if (this.state.hasMore) {
      this.setState({ loadMore: true })
      promiseApi(Taro.request)({
        url: `${protocol}://${server}:${port}/search`,
        method: 'GET',
        data: {
          value: this.state.value,
          page: ++this.state.page
        }
      }).then(res => {
        // console.log(res)
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
          this.setState({ hasMore: false })
        }
      })
    }
  }
  componentWillMount() {
    this.$preloadData
      .then(res => {
        if (res.statusCode === 200 && res.data.status === 'success') {
          if (res.data.returnDatas.length < this.pageSize) {
            this.setState({
              hasMore: false,
              loadMore: false,
              waterFallDatas: [res.data.returnDatas]
            })
          } else {
            this.setState({
              loadMore: false,
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
  componentWillPreload(params) {
    return this.fetchSearchData(params.value)
  }
  render() {
    const windowHeight = getSystemInfo().windowHeight+'px'
    return (
      <ScrollView className='search' enableFlex scrollY onScrollToLower={()=>{this.fetchMore()}} style={{height:windowHeight}}>
        <SearchContent datas={this.state.waterFallDatas} hasMore={this.state.hasMore} loadMore={this.state.loadMore} />
      </ScrollView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Search as ComponentClass<PageOwnProps, PageState>