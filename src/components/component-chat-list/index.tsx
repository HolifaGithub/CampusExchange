import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {

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
    state = {
        loading: true,
    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    render() {
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View>
                    <View className='chat-list'>
                        <Image className='avatar' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                        <View className='content'>
                            <View className='nick-name'>Holifa</View>
                            <View className='chat-content'>成色怎么样</View>
                            <View className='date'>11天前</View>
                        </View>
                        <Image className='top-pic' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                    </View>
                    <View className='chat-list'>
                        <Image className='avatar' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                        <View className='content'>
                            <View className='nick-name'>Holifa</View>
                            <View className='chat-content'>成色怎么样</View>
                            <View className='date'>11天前</View>
                        </View>
                        <Image className='top-pic' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                    </View>
                    <View className='chat-list'>
                        <Image className='avatar' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                        <View className='content'>
                            <View className='nick-name'>Holifa</View>
                            <View className='chat-content'>成色怎么样</View>
                            <View className='date'>11天前</View>
                        </View>
                        <Image className='top-pic' src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg'></Image>
                    </View>
                </View>
            </Skeleton>
        )
    }
}
export default ChatList as ComponentClass<PageOwnProps, PageState>