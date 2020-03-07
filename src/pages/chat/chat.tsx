import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './chat.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Chat {
  props: IProps;
}

@connect(({  }) => ({
  
}), (dispatch) => ({

}))
class Chat extends Component {
    config: Config = {
    navigationBarTitleText: '聊天页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='chat'>
        <View><Text>Chat Page</Text></View>
      </View>
    )
  }
}

export default Chat as ComponentClass<PageOwnProps, PageState>
