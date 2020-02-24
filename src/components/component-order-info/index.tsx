import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { server, port,protocol } from '../../static-name/server'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import { AtBadge } from 'taro-ui'
import './index.scss'
// function OrderInfo(props) {
//   let [loading, setLoading] = useState(true)
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false)
//     }, 200)
//   }, [])
//   return (
//     <Skeleton
//       row={1}
//       rowHeight={60}
//       animate
//       loading={loading}
//     >
//       <View className='order-info-container'>
//         <View className='order-info-header-title'>我的交易</View>
//         <View className='order-info-content'>
//           <View className='order-info-one'>
//             <AtBadge value={6}>
//               <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>
//             </AtBadge>
//             <Text>我发布的</Text>
//           </View>
//           <View className='order-info-one'>
//             <AtBadge value={2}>
//               <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
//             </AtBadge>
//             <Text>交易中的</Text>
//           </View>
//           <View className='order-info-one'>
//             <AtBadge value={3}>
//               <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>
//             </AtBadge>
//             <Text>我买到的</Text>
//           </View>
//           <View className='order-info-one'>
//             <AtBadge value={2}>
//               <Image src={`${CDNWebSite}/icon/user-info/sale.png`} className='icon'></Image>
//             </AtBadge>
//             <Text>我卖出的</Text>
//           </View>
//         </View>
//       </View>
//     </Skeleton>
//   )
// }

// export default Taro.memo(OrderInfo)

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

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
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
            <View className='order-info-one'>
              {isLogin ? <AtBadge value={this.state.orderInfo.released}>
                <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>}
              <Text>我发布的</Text>
            </View>
            <View className='order-info-one'>
              {isLogin ? <AtBadge value={this.state.orderInfo.trading}>
                <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
              }
              <Text>交易中的</Text>
            </View>
            <View className='order-info-one'>
              {isLogin ? <AtBadge value={this.state.orderInfo.bougth}>
                <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>
              </AtBadge> : <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>}
              <Text>我买到的</Text>
            </View>
            <View className='order-info-one'>
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

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default OrderInfo as ComponentClass<PageOwnProps, PageState>