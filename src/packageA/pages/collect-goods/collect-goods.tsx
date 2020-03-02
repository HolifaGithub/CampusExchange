import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import getSystemInfo from '../../../utils/getSystemInfo'
import promiseApi from '../../../utils/promiseApi'
import { AtActivityIndicator, AtDivider } from "taro-ui"
import { View, ScrollView } from '@tarojs/components'
import { server, port, protocol } from '../../../static-name/server'
import CollectListContent from '../../components/component-collect-list-content'
import NotFound from '../../../components/componnent-not-found'
import './collect-goods.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

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

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
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
                {this.state.hasMore ? null : <AtDivider content='没有更多了!' fontColor='#C41A16' lineColor='#eee' />}
            </ScrollView>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default CollectGoods as ComponentClass<PageOwnProps, PageState>
