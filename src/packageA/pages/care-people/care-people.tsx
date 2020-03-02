import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import getSystemInfo from '../../../utils/getSystemInfo'
import promiseApi from '../../../utils/promiseApi'
import { AtActivityIndicator, AtDivider } from "taro-ui"
import { View, ScrollView } from '@tarojs/components'
import { server, port, protocol } from '../../../static-name/server'
import CarePeopleContent from '../../components/component-care-people-content'
import NotFound from '../../../components/componnent-not-found'
import './care-people.scss'

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

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
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

export default CarePeople as ComponentClass<PageOwnProps, PageState>
