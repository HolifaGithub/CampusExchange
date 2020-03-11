import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { AtBadge } from 'taro-ui'
import { connect } from '@tarojs/redux'
import transformDateToBefore from '../../utils/transformDateToBefore'
import promiseApi from '../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}
interface ChatListReturnDatas {
    avatarUrl: string;
    nickName: string;
    topPicSrc: string;
    lastChatContent: string;
    lastChatTime: string;
    orderId: string;
    otherOpenId: string;
}
type PageOwnProps = {
    datas: ChatListReturnDatas[]
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatList {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ChatList extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        datas: []
    }
    state = {
        loading: true,
    }

    componentWillMount() {
        this.setState({ loading: false })
    }
    onClick(orderId, otherOpenId) {
        this.$preload({
            orderId,
            otherOpenId
        })
        promiseApi(Taro.navigateTo)({
            url: '/pages/chat-info/chat-info'
        })
    }
    render() {
        const { datas } = this.props
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View>
                    {(datas && datas.length > 0) ? datas.map((data, index) => {
                        const { avatarUrl, orderId, nickName, lastChatContent, lastChatTime, topPicSrc, otherOpenId } = data
                        // Taro.getStorage({key:orderId,
                        // success(res){
                        //     console.log(res.data);
                        // }
                        // })
                        const transformDate = transformDateToBefore(lastChatTime)
                        return (
                            <View className='chat-list' key={new Date().toString() + index} onClick={() => { this.onClick(orderId, otherOpenId) }}>
                                <AtBadge value={10} maxValue={99}>
                                    <Image className='avatar' src={avatarUrl}></Image>
                                </AtBadge>
                                <View className='content'>
                                    <View className='nick-name'>{nickName}</View>
                                    <View className='chat-content'>{lastChatContent}</View>
                                    <View className='date'>{transformDate}</View>
                                </View>
                                <Image className='top-pic' src={topPicSrc}></Image>
                            </View>)
                    }) : null}

                </View>
            </Skeleton>
        )
    }
}
export default ChatList as ComponentClass<PageOwnProps, PageState>