import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderStatusContent from '../../components/component-order-status-content'
import { server, port, protocol } from '../../../static-name/server'
import {  AtActivityIndicator, AtDivider } from "taro-ui"
import NotFound from '../../../components/componnent-not-found'
import './order-status.scss'
import promiseApi from '../../../utils/promiseApi'

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
interface OrderListReturnDatas{
  orderId:string;
  nameInput:string;
  newAndOldDegree:string;
  topPicSrc:string;
  typeOne:string;
  typeTwo:string;
  typeThree:string;
  goodsNumber:string;
}

type PageOwnProps = {}

type PageState = {
  loadMore: boolean;
  page: number;
  hasMore:  boolean;
  orderListDatas: OrderListReturnDatas[];
  orderStatus:string;
  orderInfo:string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderStatus {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class OrderStatus extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '订单状态页',
    navigationBarBackgroundColor: "#eee"
  }
  state = {
    loadMore: false,
    page: 1,
    hasMore: true,
    orderListDatas: [],
    orderStatus:'',
    orderInfo:'',
  }
  pageSize=7
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps)
  // }
componentWillMount(){
  const orderStatus=this.$router.preload!.orderStatus
  const orderInfo = this.$router.preload!.orderInfo
  this.fetchOrderList(orderStatus,orderInfo).then((res:any)=>{
          if (res.statusCode === 200 && res.data.status === 'success') {
        if (res.data.returnDatas.length===this.pageSize) {
          this.setState({ 
            orderListDatas: res.data.returnDatas ,
            hasMore:true,
            orderStatus:res.data.orderStatus,
            orderInfo:res.data.orderInfo
          })
        } else {
          this.setState({ 
            hasMore: false,
            orderStatus:res.data.orderStatus,
            orderInfo:res.data.orderInfo,
            orderListDatas: res.data.returnDatas 
          })
        }
      }
  })
  // if(this.$preloadData){
  //   this.$preloadData.then((res)=>{
  //     if (res.statusCode === 200 && res.data.status === 'success') {
  //       if (res.data.returnDatas.length===this.pageSize) {
  //         this.setState({ 
  //           orderListDatas: res.data.returnDatas ,
  //           hasMore:true,
  //           orderStatus:res.data.orderStatus,
  //           orderInfo:res.data.orderInfo
  //         })
  //       } else {
  //         this.setState({ 
  //           hasMore: false,
  //           orderStatus:res.data.orderStatus,
  //           orderInfo:res.data.orderInfo,
  //           orderListDatas: res.data.returnDatas 
  //         })
  //       }
  //     }
  //   })
  // }
}
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // componentWillPreload(params) {
  //   if (params.orderStatus && params.orderInfo) {
  //     return this.fetchOrderList(params.orderStatus, params.orderInfo)
  //   }
  // }
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
  fetchMore(){
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
            if (res.data.returnDatas.length===this.pageSize) {
              this.setState((prevState: PageState) => {
                return {
                  hasMore:true,
                  loadMore:false,
                  orderListDatas: prevState.orderListDatas.concat(res.data.returnDatas)
                }
              })
            } else {
              this.setState({ 
                hasMore: false,
                loadMore:false,
              })
            }
          } 
        })
      }
    })
  }
  onReachBottom(){
    if(this.state.hasMore){
      this.setState({loadMore:true})
      this.fetchMore()
    }
  }
  render() {
    return (
      <View className='order-status'>       
        {this.state.orderListDatas.length>0?(<OrderStatusContent datas={this.state.orderListDatas}/>):(<NotFound/>)}
        {this.state.loadMore ? <View className='loading'>
          <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
        </View> : null}
        {this.state.hasMore ? null : <AtDivider content='没有更多了!' fontColor='#C41A16' lineColor='#C41A16' />}
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default OrderStatus as ComponentClass<PageOwnProps, PageState>
