import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import './chat-info.scss'
import ChatContent from '../../components/component-chat-content'
type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}
interface ChatInfo {
  type: number;
  chatTime: string;
  content: string;
}
interface GoodsInfo{
  payForMePrice: number;
  payForOtherPrice: number;
  goodsNumber: number;
  newAndOldDegree: string;
  wantExchangeGoods: string;
  nameInput: string;
  topPicSrc:string;
  orderId:string;
}
type PageState = {
  chatInfo:ChatInfo[];
  goodsInfo:GoodsInfo;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatInfo {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ChatInfo extends Component {
  config: Config = {
    navigationBarTitleText: '聊天内容',
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: false
  }
  state={
    chatInfo:[],
    goodsInfo:{
      payForMePrice: 0,
      payForOtherPrice: 0,
      goodsNumber: 0,
      newAndOldDegree: '',
      wantExchangeGoods: '',
      nameInput: '',
      topPicSrc:'',
      orderId:''
    }
  }
  componentWillMount() {
    const orderId = this.$router.preload!.orderId
    if (orderId) {
      promiseApi(Taro.login)().then((loginResult) => {
        const code = loginResult.code
        if (code) {
          promiseApi(Taro.request)({
            url: `${protocol}://${server}:${port}/getchatinfo`,
            method: 'GET',
            data: {
              code: code,
              orderId: orderId
            }
          }).then((res) => { 
            if(res.statusCode===200&&res.data.status==='success'){
              this.setState({
                chatInfo:res.data.chatInfo,
                goodsInfo:res.data.goodsInfo
              })
            }
          })
        }
      })
    }
  }
  render() {
    return (
      <View className='chat-info'>
        <ChatContent chatInfo={this.state.chatInfo} goodsInfo={this.state.goodsInfo}/>
      </View>
    )
  }
}

export default ChatInfo as ComponentClass<PageOwnProps, PageState>
