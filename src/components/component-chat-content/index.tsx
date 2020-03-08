import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Input, Image, ScrollView } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../utils/getSystemInfo'
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
    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    render() {
        const windowHeight = (getSystemInfo().windowHeight - 70) + 'px'
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View>
                    <ScrollView className='chat-content' scrollY enableFlex style={{ height: windowHeight }}>
                        <View className='main'>
                            <View className='send-by-other'>
                                <View>
                                    <View className='nick-name'>Holifa</View>
                                    <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg' className='avatar'></Image>
                                </View>
                                <View className='send-container'>
                                    <View className='send-time'>2020年3月8日 10:47</View>
                                    <View className='send-content other'>在吗？aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafjkqwehreiwrhwiur</View>
                                </View>
                            </View>
                            <View className='send-by-me'>
                                <View className='send-container'>
                                    <View className='send-time'>2020年3月8日 10:49</View>
                                    <View className='send-content me'>在的在吗？aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafjkqwehreiwrhwiur</View>
                                </View>
                                <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner/banner1.jpg' className='avatar'></Image>
                            </View>
                        </View>
                    </ScrollView>
                    <View className='send'>
                        <Input placeholder='想跟TA说点什么呢' className='input' placeholderClass='placeholder'></Input>
                        <View className='send-btn'>发送</View>
                    </View>
                    <View className='blank'></View>
                </View>
            </Skeleton>
        )
    }
}
export default ChatContent as ComponentClass<PageOwnProps, PageState>