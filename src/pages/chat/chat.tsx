import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import getSystemInfo from '../../utils/getSystemInfo'
import { server, port, protocol } from '../../static-name/server'
import promiseApi from '../../utils/promiseApi'
import { connect } from '@tarojs/redux'
import ChatList from '../../components/component-chat-list'
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

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Chat extends Component {
  constructor(props) {
    super(props)
  }
  config: Config = {
    navigationBarTitleText: '聊天列表',
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white'
  }
  pageSize = 8
  state = {
    page: 1,
    hasMore: true,
    chatListDatas: [],
  }
  componentWillMount() {
    promiseApi(Taro.login)().then((loginResult) => {
      const code = loginResult.code
      if (code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getchatlist`,
          method: 'GET',
          data: {
            code: code,
            page:1
          }
        }).then((res) => {
          console.log(res);
        })
      }
    })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const windowHeight = (getSystemInfo().windowHeight - getSystemInfo().tabBarHeight) + 'px'
    return (
      <ScrollView className='chat' enableFlex scrollY onScrollToLower={() => { }} style={{ height: windowHeight }}>
        <ChatList />
      </ScrollView>
    )
  }
}

export default Chat as ComponentClass<PageOwnProps, PageState>
