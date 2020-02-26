import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { server, port, protocol } from '../../static-name/server'
import TradingContent from '../../components/component-trading'
import './trading.scss'

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

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Trading {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Trading extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '交易页',
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: false
  }
  
  state={
    datas: {
      avatarUrl: '',
      nickName: '',
      typeOne: '',
      typeTwo: '',
      typeThree: '',
      orderTime: '',
      nameInput: '',
      goodsNumber: 0,
      newAndOldDegree: '',
      mode: '',
      objectOfPayment: '',
      payForMePrice: 0,
      payForOtherPrice: 0,
      wantExchangeGoods: '',
      topPic: '',
      orderId: '',
      school: '',
      salederPhone:'',
      salederAddress:'',
      buierPhone:'',
      buierAddress:'',
      buierAvatarUrl:'',
      orderCode:'',
      buierNickName:''
  }
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }
  componentWillMount() {
    this.$preloadData
      .then(res => {
        // console.log('res: ', res)
        this.setState({datas:res})
      })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  componentWillPreload(params) {
    return new Promise((resolve, reject) => {
      const orderId = params.orderId
      if (orderId) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/trading`,
          method: 'GET',
          data: {
            orderId: orderId
          }
        }).then((res) => {
          if (res.statusCode = 200 && res.data.status === 'success') {
            const datas = Object.assign({}, params, res.data)
            resolve(datas)
          } else {
            reject()
          }
        })
      }
    })
  }
  render() {
    return (
      <View className='trading'>
        <TradingContent datas={this.state.datas}/>
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

export default Trading as ComponentClass<PageOwnProps, PageState>
