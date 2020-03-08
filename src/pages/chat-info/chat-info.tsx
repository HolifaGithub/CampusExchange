import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './chat-info.scss'
import ChatContent from '../../components/component-chat-content'
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatInfo {
  props: IProps;
}

@connect(({  }) => ({
  
}), (dispatch) => ({

}))
class ChatInfo extends Component {
    config: Config = {
    navigationBarTitleText: '聊天内容',
    navigationBarBackgroundColor:'#C41A16',
    navigationBarTextStyle:'white'
  }

  render () {
    return (
      <View className='chat-info'>
        <ChatContent/>
      </View>
    )
  }
}

export default ChatInfo as ComponentClass<PageOwnProps, PageState>
