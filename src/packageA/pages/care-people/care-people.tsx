import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import getSystemInfo from '../../../utils/getSystemInfo'
import promiseApi from '../../../utils/promiseApi'
import { AtActivityIndicator} from "taro-ui"
import { View, ScrollView } from '@tarojs/components'
import { server, port, protocol } from '../../../static-name/server'
import CarePeopleContent from '../../components/component-care-people-content'
import NotFound from '../../../components/componnent-not-found'
import './care-people.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}
interface CareListDatas {
    nickName: string;
    avatarUrl: string;
    collage: string;
    userClass: string;
    concernedOrderId: string;
}
type PageState = {
    loadMore: boolean;
    page: number;
    hasMore: boolean;
    careListDatas: CareListDatas[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CarePeople {
    props: IProps;
}

class CarePeople extends Component {
    config: Config = {
        navigationBarTitleText: '我的关注',
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: '#eee'
    }
    state = {
        loadMore: false,
        page: 1,
        hasMore: true,
        careListDatas: [],
    }
    pageSize = 8
    componentWillMount() {
        promiseApi(Taro.login)().then((loginResult) => {
            const code = loginResult.code
            if (code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/getcarelist`,
                    method: 'GET',
                    data: {
                        code: code,
                        page: 1
                    }
                }).then((res) => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        if (res.data.returnDatas.length === this.pageSize) {
                            this.setState({
                                careListDatas: res.data.returnDatas,
                                hasMore: true,
                            })
                        } else {
                            this.setState({
                                hasMore: false,
                                careListDatas: res.data.returnDatas
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
                    url: `${protocol}://${server}:${port}/getcarelist`,
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
                                    careListDatas: prevState.careListDatas.concat(res.data.returnDatas)
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
            <ScrollView className='care-people' enableFlex scrollY onScrollToLower={() => { }} style={{ height: windowHeight }}>
                {(this.state.careListDatas && this.state.careListDatas.length > 0) ? this.state.careListDatas.map((data, index) => {
                    return (<CarePeopleContent data={data} key={new Date().toString() + index} />)
                }) : <NotFound />}
                {this.state.loadMore ? <View className='loading'>
                    <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
                </View> : null}
                {this.state.hasMore ? null : <View className='not-more'>----------- 没有更多了！-----------</View>}
            </ScrollView>
        )
    }
}

export default CarePeople as ComponentClass<PageOwnProps, PageState>
