import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import getSystemInfo from '../../../utils/getSystemInfo'
import promiseApi from '../../../utils/promiseApi'
import { AtActivityIndicator} from "taro-ui"
import { View, ScrollView } from '@tarojs/components'
import { server, port, protocol } from '../../../static-name/server'
import CollectListContent from '../../components/component-collect-list-content'
import NotFound from '../../../components/componnent-not-found'
import './collect-goods.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

interface CollectListDatas {
    orderId: string;
    nameInput: string;
    newAndOldDegree: string;
    topPicSrc: string;
    typeOne: string;
    typeTwo: string;
    typeThree: string;
    goodsNumber: string;
}
type PageState = {
    loadMore: boolean;
    page: number;
    hasMore: boolean;
    collectListDatas:CollectListDatas[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CollectGoods {
    props: IProps;
}

class CollectGoods extends Component {
    config: Config = {
        navigationBarTitleText: '我的收藏',
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: '#eee'
    }
    state = {
        loadMore: false,
        page: 1,
        hasMore: true,
        collectListDatas: [],
    }
    pageSize = 8
    componentWillMount() {
        promiseApi(Taro.login)().then((loginResult) => {
            const code = loginResult.code
            if (code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/getcollectlist`,
                    method: 'GET',
                    data: {
                        code: code,
                        page: 1
                    }
                }).then((res) => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        if (res.data.returnDatas.length === this.pageSize) {
                            this.setState({
                                collectListDatas: res.data.returnDatas,
                                hasMore: true,
                            })
                        } else {
                            this.setState({
                                hasMore: false,
                                collectListDatas: res.data.returnDatas
                            })
                        }
                    }
                })
            }
        })
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    onReachBottom() {
        this.setState({ loadMore: true })
        promiseApi(Taro.login)().then((loginResult) => {
            if (loginResult.code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/getcollectlist`,
                    method: 'GET',
                    data: {
                        code: loginResult.code,
                        page: ++this.state.page
                    }
                }).then(res => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        if (res.data.returnDatas.length === this.pageSize) {
                            this.setState((prevState: PageState) => {
                                return {
                                    hasMore: true,
                                    loadMore: false,
                                    collectListDatas: prevState.collectListDatas.concat(res.data.returnDatas)
                                }
                            })
                        } else {
                            this.setState({
                                hasMore: false,
                                loadMore: false,
                            })
                        }
                    }
                })
            }
        })
    }
    render() {
        const windowHeight = getSystemInfo().windowHeight + 'px'
        return (
            <ScrollView className='collect-goods' enableFlex scrollY onScrollToLower={() => { }} style={{ height: windowHeight }}>
                {(this.state.collectListDatas && this.state.collectListDatas.length > 0) ? this.state.collectListDatas.map((data, index) => {
                    return (<CollectListContent data={data} key={new Date().toString() + index} />)
                }) : <NotFound />}
                {this.state.loadMore ? <View className='loading'>
                    <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
                </View> : null}
                {this.state.hasMore ? null : <View className='not-more'>----------- 没有更多了！-----------</View>}
            </ScrollView>
        )
    }
}

export default CollectGoods as ComponentClass<PageOwnProps, PageState>
