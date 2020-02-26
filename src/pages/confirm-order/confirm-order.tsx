import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ConfirmOrderContent from '../../components/component-confirm-order-content'
import './confirm-order.scss'

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

type PageState = {
  
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ConfirmOrder {
  props: IProps;
}


@connect(({ }) => ({

}), (dispatch) => ({

}))
class ConfirmOrder extends Component {
  constructor(props){
    super(props)

  }
  state={
    datas:{
      avatarUrl:'',
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
      payForOtherPrice:0,
      wantExchangeGoods: '',
      topPic: '',
      orderId: '',
      school: '',
  }
  }
  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '确认订单页',
    navigationBarBackgroundColor: "#eeeeee"
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  componentWillPreload(params) {
    this.setState({datas:params})
  }
  render() {
    return (
      <View className='confirm-order'>
        <ConfirmOrderContent datas={this.state.datas}/>
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

export default ConfirmOrder as ComponentClass<PageOwnProps, PageState>