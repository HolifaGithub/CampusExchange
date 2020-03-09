import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Input, Image, ScrollView } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../utils/getSystemInfo'
import promiseApi from '../../utils/promiseApi'
import formatDate from '../../utils/formatDate'
import Tag from '../component-tag'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}
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
type PageOwnProps = {
    chatInfo:ChatInfo[],
    goodsInfo:GoodsInfo,
    chatNickName:string;
    chatAvatarUrl:string;
    myAvatarUrl:string;
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ChatContent extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        value: ''
    }
    static defaultProps={
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
        },
        chatNickName:'',
        chatAvatarUrl:'',
        myAvatarUrl:''
    }
    componentWillMount() {
        this.setState({ loading: false })
    }
    onClick(orderId){
        promiseApi(Taro.login)().then((loginResult) => {
            const code = loginResult.code
            if (code) {
              promiseApi(Taro.request)({
                url: `${protocol}://${server}:${port}/sendchatinfo`,
                method: 'POST',
                data: {
                  code: code,
                  orderId: orderId,
                  value:this.state.value
                }
              }).then((res) => {
                console.log(res);
              })
            }
        })
    }
    render() {
        const windowHeight = (getSystemInfo().windowHeight - 70) + 'px'
        const {payForMePrice,payForOtherPrice,goodsNumber,newAndOldDegree,wantExchangeGoods,nameInput,topPicSrc,orderId} = this.props.goodsInfo
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View>
                    <ScrollView className='chat-content' scrollY enableFlex style={{ height: windowHeight }}>
                        <View className='goods-introduction'>
                            <View className='order-id'>
                                订单编号：{orderId}
                            </View>
                            <View className='goods-introduction-content'>
                                <Image src={topPicSrc} className='img'></Image>
                                <View className='introduction'>
                                    <View className='title'>{nameInput}</View>
                                    <View className='degree-and-count'>
                                        <Tag title={newAndOldDegree + '新'} fontSize={'12px'} />
                                        <View className='count'>数量：{goodsNumber}</View>
                                    </View>
                                    <View className='price-info'>
                                        < View className='want-exchange'>买家需给卖家：{wantExchangeGoods}</View>
                                        <View className='pay-for-me'>买家需要支付：&yen; {payForMePrice}</View>
                                        <View className='pay-for-other'>买家将要收入：&yen; {payForOtherPrice}</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className='main'>
                            {this.props.chatInfo&&this.props.chatInfo.length>0?(
                                this.props.chatInfo.map((chat,index)=>{
                                    const date = formatDate(chat.chatTime)
                                    const time = `${date.year}年${date.month}月${date.day}日 ${date.hour}:${date.minute}:${date.second}`
                                    if(chat.type === 0 ){
                                        return (
                                            <View className='send-by-me-conatiner'>
                                            <View className='send-by-me' key={chat.chatTime}>
                                            <View className='send-container'>
                                                <View className='send-time'>{time}</View>
                                                <View className='send-content me'>{chat.content}</View>
                                            </View>
                                            <Image src={this.props.myAvatarUrl} className='avatar'></Image>
                                        </View>
                                        </View>
                                        )
                                    }else if (chat.type===1){
                                        return (
                                            <View className='send-by-other' key={chat.chatTime}>
                                            <View>
                                                <View className='nick-name'>{this.props.chatNickName}</View>
                                                <Image src={this.props.chatAvatarUrl} className='avatar'></Image>
                                            </View>
                                            <View className='send-container'>
                                                <View className='send-time'>{time}</View>
                                                <View className='send-content other'>{chat.content}</View>
                                            </View>
                                        </View>
                                        )
                                    }
                                })
                            ):null}

                        </View>
                    </ScrollView>
                    <View className='send'>
                        <Input placeholder='想跟TA说点什么呢' className='input' placeholderClass='placeholder' value={this.state.value} onInput={(event) => {
                            this.setState({value:event.detail.value})
                        }}></Input>
                        <View className='send-btn' hoverClass='hover' onClick={()=>{this.onClick(orderId)}}>发送</View>
                    </View>
                    <View className='blank'></View>
                </View>
            </Skeleton>
        )
    }
}
export default ChatContent as ComponentClass<PageOwnProps, PageState>