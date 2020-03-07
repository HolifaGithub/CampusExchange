import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { server, port,protocol } from '../../static-name/server'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import orderStatusObject from '../../static-name/order-status'
import orderInfoObject from '../../static-name/oredr-info-name'
import { AtBadge } from 'taro-ui'
import './index.scss'

type PageStateProps = {
  checkIsNeedRelogin: {
    isNeedRelogin: boolean;
  }
}

type PageDispatchProps = {

}

type PageOwnProps = {
  isSessionEffective: boolean;
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderInfo {
  props: IProps;
}

@connect(({ checkIsNeedRelogin }) => ({
  checkIsNeedRelogin
}), (dispatch) => ({

}))
class OrderInfo extends Component {
  state = {
    loading: true,
    orderInfo: {
      released: 0,
      trading: 0,
      bougth: 0,
      saled: 0
    }
  }
  componentDidMount() {
    this.setState({ loading: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin) {
      this.fetchOrderData()
    }
  }
  fetchOrderData() {
    promiseApi(Taro.login)().then(loginResult => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getorderinfo`,
          method: 'GET',
          data: {
            code: loginResult.code
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            this.setState({
              orderInfo: {
                released: res.data.released,
                trading: res.data.trading,
                bougth: res.data.bougth,
                saled: res.data.saled
              }
            })
          }
        })
      }
    })
  }
  onClick(orderStatus,orderInfo){
    this.$preload({
      orderStatus:orderStatus,
      orderInfo:orderInfo
    })
    promiseApi(Taro.navigateTo({
        url:`/packageA/pages/order-status/order-status`
    }))
  }
  componentWillUnmount() { }

  componentDidShow() {
    if (this.props.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin) {
      this.fetchOrderData()
    }
  }

  componentDidHide() { }

  render() {
    const isLogin = this.props.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin
    return (
      <Skeleton
        row={1}
        rowHeight={60}
        animate
        loading={this.state.loading}
      >
        <View className='order-info-container'>
          <View className='order-info-header-title'>我的交易</View>
          <View className='order-info-content'>
            <View className='order-info-one' onClick={()=>{this.onClick(orderStatusObject.released,orderInfoObject.released)}} hoverClass='hover'>
              {isLogin ? <AtBadge value={this.state.orderInfo.released}>
                <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>}
              <Text>我发布的</Text>
            </View>
            <View className='order-info-one' onClick={()=>{this.onClick(orderStatusObject.trading,orderInfoObject.trading)}} hoverClass='hover'>
              {isLogin ? <AtBadge value={this.state.orderInfo.trading}>
                <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
              }
              <Text>交易中的</Text>
            </View>
            <View className='order-info-one' onClick={()=>{this.onClick(orderStatusObject.completed,orderInfoObject.bougth)}} hoverClass='hover'>
              {isLogin ? <AtBadge value={this.state.orderInfo.bougth}>
                <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>}
              <Text>我买到的</Text>
            </View>
            <View className='order-info-one' onClick={()=>{this.onClick(orderStatusObject.completed,orderInfoObject.saled)}} hoverClass='hover'>
              {isLogin ? <AtBadge value={this.state.orderInfo.saled}>
                <Image src={`${CDNWebSite}/icon/user-info/sale.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/sale.png`} className='icon'></Image>}
              <Text>我卖出的</Text>
            </View>
          </View>
        </View>
      </Skeleton>
    )
  }
}
export default OrderInfo as ComponentClass<PageOwnProps, PageState>