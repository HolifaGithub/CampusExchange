import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RechargeContent from '../../components/component-recharge-content'
import './recharge.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Recharge {
  props: IProps;
}

class Recharge extends Component {
    config: Config = {
    navigationBarTitleText: '充值',
    enablePullDownRefresh:false
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='recharge'>
        <RechargeContent/>
      </View>
    )
  }
}

export default Recharge as ComponentClass<PageOwnProps, PageState>
