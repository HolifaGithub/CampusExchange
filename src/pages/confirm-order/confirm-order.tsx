import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ConfirmOrderContent from '../../components/component-confirm-order-content'
import './confirm-order.scss'

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

export default ConfirmOrder as ComponentClass<PageOwnProps, PageState>
