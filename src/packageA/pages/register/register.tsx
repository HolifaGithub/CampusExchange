import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import RegisterContent from '../../floors/floor-register-content'
import { connect } from '@tarojs/redux'
import './register.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Register {
  props: IProps;
}

@connect(({  }) => ({
  
}), (dispatch) => ({

}))
class Register extends Component {
    config: Config = {
    navigationBarTitleText: '新用户注册页',
    navigationBarBackgroundColor:'#e54d42',
    navigationBarTextStyle:"white",
    enablePullDownRefresh:false
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='register'>
          <RegisterContent/>
      </View>
    )
  }
}

export default Register as ComponentClass<PageOwnProps, PageState>