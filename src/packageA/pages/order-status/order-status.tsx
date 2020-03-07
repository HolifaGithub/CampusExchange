import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View,ScrollView} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../../utils/getSystemInfo'
import OrderStatusContent from '../../components/component-order-status-content'
import { server, port, protocol } from '../../../static-name/server'
import { AtActivityIndicator } from "taro-ui"
import NotFound from '../../../components/componnent-not-found'
import './order-status.scss'
import promiseApi from '../../../utils/promiseApi'

type PageStateProps = {

}

type PageDispatchProps = {

}
interface OrderListReturnDatas {
  orderId: string;
  nameInput: string;
  newAndOldDegree: string;
  topPicSrc: string;
  typeOne: string;
  typeTwo: string;
  typeThree: string;
  goodsNumber: string;
}

type PageOwnProps = {}

type PageState = {
  loadMore: boolean;
  page: number;
  hasMore: boolean;
  orderListDatas: OrderListReturnDatas[];
  orderStatus: string;
  orderInfo: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderStatus {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class OrderStatus extends Component {
  config: Config = {
    navigationBarTitleText: '订单状态页',
    navigationBarBackgroundColor: "#eee"
  }
  state = {
    loadMore: false,
    page: 1,
    hasMore: true,
    orderListDatas: [],
    orderStatus: '',
    orderInfo: '',
  }
  pageSize = 7
  componentWillMount() {
    const orderStatus = this.$router.preload!.orderStatus
    const orderInfo = this.$router.preload!.orderInfo
    this.fetchOrderList(orderStatus, orderInfo).then((res: any) => {
      if (res.statusCode === 200 && res.data.status === 'success') {
        if (res.data.returnDatas.length === this.pageSize) {
          this.setState({
            orderListDatas: res.data.returnDatas,
            hasMore: true,
            orderStatus: res.data.orderStatus,
            orderInfo: res.data.orderInfo
          })
        } else {
          this.setState({
            hasMore: false,
            orderStatus: res.data.orderStatus,
            orderInfo: res.data.orderInfo,
            orderListDatas: res.data.returnDatas
          })
        }
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  fetchOrderList(orderStatus, orderInfo) {
    return new Promise((resolve, reject) => {
      promiseApi(Taro.login)().then((loginResult) => {
        const code = loginResult.code
        if (code) {
          promiseApi(Taro.request)({
            url: `${protocol}://${server}:${port}/orderlist`,
            method: 'GET',
            data: {
              code: code,
              orderStatus: orderStatus,
              orderInfo: orderInfo,
              page: this.state.page
            }
          }).then((res) => {
            resolve(res)
          })
        }
      })
    })
  }
  fetchMore() {
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/orderlist`,
          method: 'GET',
          data: {
            code: loginResult.code,
            orderStatus: this.state.orderStatus,
            orderInfo: this.state.orderInfo,
            page: ++this.state.page
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length === this.pageSize) {
              this.setState((prevState: PageState) => {
                return {
                  hasMore: true,
                  loadMore: false,
                  orderListDatas: prevState.orderListDatas.concat(res.data.returnDatas)
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
  onScrollToLower() {
    if (this.state.hasMore) {
      this.setState({ loadMore: true })
      this.fetchMore()
    }
  }
  render() {
    const windowHeight = getSystemInfo().windowHeight + 'px'
    return (
      <ScrollView className='order-status' enableFlex scrollY  style={{ height: windowHeight }}
      onScrollToLower={() => {
        this.onScrollToLower()
       }}
      >
        {this.state.orderListDatas.length > 0 ? (<OrderStatusContent datas={this.state.orderListDatas} orderInfo={this.state.orderInfo} />) : (<NotFound />)}
        {this.state.loadMore ? <View className='loading'>
          <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
        </View> : null}
        {this.state.hasMore ? null :<View className='not-more'>----------- 没有更多了！-----------</View>}
      </ScrollView>
    )
  }
}

export default OrderStatus as ComponentClass<PageOwnProps, PageState>
