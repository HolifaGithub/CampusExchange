import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,ScrollView } from '@tarojs/components'
import getSystemInfo from '../../utils/getSystemInfo'
import { connect } from '@tarojs/redux'
import  ChatList from '../../components/component-chat-list'
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
    navigationBarTitleText: '聊天列表',
    navigationBarBackgroundColor:'#C41A16',
    navigationBarTextStyle:'white'
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const windowHeight = (getSystemInfo().windowHeight-getSystemInfo().tabBarHeight) + 'px'
    return (
      <ScrollView className='chat' enableFlex scrollY onScrollToLower={() => { }} style={{ height: windowHeight }}>
          <ChatList/>
      </ScrollView>
    )
  }
}

export default Chat as ComponentClass<PageOwnProps, PageState>
