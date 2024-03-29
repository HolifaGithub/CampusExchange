import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import formatDate from '../../utils/formatDate'
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
interface GoodsInfo {
  payForMePrice: number;
  payForOtherPrice: number;
  goodsNumber: number;
  newAndOldDegree: string;
  wantExchangeGoods: string;
  nameInput: string;
  topPicSrc: string;
  orderId: string;
}
type PageState = {
  chatInfo: ChatInfo[];
  goodsInfo: GoodsInfo;
  chatNickName: string;
  chatAvatarUrl: string;
  myAvatarUrl: string;
  otherOpenId:string;
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
    navigationBarBackgroundColor: '#e54d42',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: false
  }
  state = {
    chatInfo: [],
    goodsInfo: {
      payForMePrice: 0,
      payForOtherPrice: 0,
      goodsNumber: 0,
      newAndOldDegree: '',
      wantExchangeGoods: '',
      nameInput: '',
      topPicSrc: '',
      orderId: '',
    },
    chatNickName: '',
    chatAvatarUrl: '',
    myAvatarUrl: '',
    otherOpenId:''
  }
  ChatInfoInStorage = []
  getChatInfoStartTime = ''

  fetchChatInfo(orderId,otherOpenId) {
    promiseApi(Taro.login)().then((loginResult) => {
      const code = loginResult.code
      if (code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getchatinfo`,
          method: 'GET',
          data: {
            code: code,
            orderId: orderId,
            otherOpenId:otherOpenId,
            getChatInfoStartTime: this.getChatInfoStartTime
          }
        }).then((res) => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            const allChatInfo = this.ChatInfoInStorage.concat(res.data.chatInfo)
            promiseApi(Taro.getStorageInfo)().then((storageInfoRes) => {
              if (storageInfoRes.currentSize < storageInfoRes.limitSize) {  //如果大小小于storage限制的大小
                promiseApi(Taro.setStorage)({  //将请求的数据保存到本地storage中
                  key: orderId,
                  data: allChatInfo
                }).then(() => {
                  this.setState({
                    chatInfo: allChatInfo,
                    goodsInfo: res.data.goodsInfo,
                    chatNickName: res.data.chatNickName,
                    chatAvatarUrl: res.data.chatAvatarUrl,
                    myAvatarUrl: res.data.myAvatarUrl,
                    otherOpenId:otherOpenId
                  })
                })
              }else{
                this.setState({
                  chatInfo: allChatInfo,
                  goodsInfo: res.data.goodsInfo,
                  chatNickName: res.data.chatNickName,
                  chatAvatarUrl: res.data.chatAvatarUrl,
                  myAvatarUrl: res.data.myAvatarUrl,
                  otherOpenId:otherOpenId
                })
              }
            })
          }
        })
      }
    })
  }
  componentWillMount() {
    const orderId = this.$router.preload!.orderId
    const otherOpenId = this.$router.preload!.otherOpenId
    if (orderId) {
      promiseApi(Taro.getStorage)({
        key: orderId
      }).then((res) => {
        //如果本地有缓存该订单的聊天记录
        this.ChatInfoInStorage = res.data
        const chatInfoLenth = res.data.length
        const lastestChatTime = res.data[chatInfoLenth - 1].chatTime
        const dateObj = formatDate(lastestChatTime)
        const { year, month, day, hour, minute, second } = dateObj
        this.getChatInfoStartTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
        this.fetchChatInfo(orderId,otherOpenId)
      }).catch(() => {
        //如果本地没有缓存该订单的聊天记录
        this.ChatInfoInStorage = []
        this.getChatInfoStartTime = ''
        this.fetchChatInfo(orderId,otherOpenId)
      })
    }
  }
  render() {
    const { chatInfo, goodsInfo, chatNickName, chatAvatarUrl, myAvatarUrl,otherOpenId } = this.state
    return (
      <View className='chat-info'>
        <ChatContent chatInfo={chatInfo} goodsInfo={goodsInfo} chatNickName={chatNickName} chatAvatarUrl={chatAvatarUrl} myAvatarUrl={myAvatarUrl} otherOpenId={otherOpenId}/>
      </View>
    )
  }
}

export default ChatInfo as ComponentClass<PageOwnProps, PageState>
