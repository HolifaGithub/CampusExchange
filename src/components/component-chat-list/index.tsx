import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { AtBadge } from 'taro-ui'
import { connect } from '@tarojs/redux'
import transformDateToBefore from '../../utils/transformDateToBefore'
import promiseApi from '../../utils/promiseApi'
import { resetItemMessageNum } from '../../actions/chatListMessageNum'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {
    chatListMessageNum: any
}

type PageDispatchProps = {
    dispatchAddItem: (id) => any;
    dispatchResetItemMessageNum: (id) => any;
}
interface ChatListReturnDatas {
    avatarUrl: string;
    nickName: string;
    topPicSrc: string;
    lastChatContent: string;
    lastChatTime: string;
    orderId: string;
    otherOpenId: string;
    id: number;
}
type PageOwnProps = {
    datas: ChatListReturnDatas[]
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ChatList {
    props: IProps;
}


@connect(({ chatListMessageNum }) => ({
    chatListMessageNum
}), (dispatch) => ({
    dispatchResetItemMessageNum(id) {
        dispatch(resetItemMessageNum(id))
    }
}))
class ChatList extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        datas: [],
        chatListMessageNum: {},
        dispatchResetItemMessageNum() { }
    }
    state = {
        loading: true,
    }

    componentWillMount() {
        this.setState({ loading: false })
    }
    onClick(orderId, otherOpenId, id) {
        this.$preload({
            orderId,
            otherOpenId
        })
        this.props.dispatchResetItemMessageNum(id)
        promiseApi(Taro.navigateTo)({
            url: '/pages/chat-info/chat-info'
        })
    }
    render() {
        const { datas, chatListMessageNum } = this.props
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View>
                    {(datas && datas.length > 0) ? datas.map((data, index) => {
                        const { avatarUrl, orderId, nickName, lastChatContent, lastChatTime, topPicSrc, otherOpenId, id } = data
                        const transformDate = transformDateToBefore(lastChatTime)
                        return (
                            <View className='chat-list' key={id} onClick={() => { this.onClick(orderId, otherOpenId, id) }}>
                                {chatListMessageNum[id] !== 0 ? (<AtBadge value={chatListMessageNum[id]} maxValue={99}>
                                    <Image className='avatar' src={avatarUrl}></Image>
                                </AtBadge>) : <Image className='avatar' src={avatarUrl}></Image>}
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