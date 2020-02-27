import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { AtSearchBar, AtDivider, AtActivityIndicator } from 'taro-ui'
import WaterFall from '../component-waterfall'
import Skeleton from 'taro-skeleton'
import './index.scss'

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
type datasType = {
    orderId: string;
    nameInput: string;
    newAndOldDegree: string;
    mode: string;
    objectOfPayment: string;
    payForMePrice: number;
    payForOtherPrice: number;
    wantExchangeGoods: string;
    topPicSrc: string;
    watchedPeople: number;
    nickName: string;
    avatarUrl: string;
}

type PageOwnProps = {
    datas: datasType[][],
    loadMore: boolean;
    hasMore: boolean;
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SearchContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class SearchContent extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        value: '',
    }
    pageSize=6
    onActionClick() {
        // this.fetchSearchData(this.state.value)
    }
    fetchSearchData(value) {
        this.setState({ value: value })
        return new Promise((resolve, reject) => {
            promiseApi(Taro.request)({
                url: `${protocol}://${server}:${port}/search`,
                method: 'GET',
                data: {
                    value: value,
                    page: 1
                }
            }).then(res => {
                if (res.statusCode === 200 && res.data.status === 'success') {
                    if (res.data.returnDatas.length < this.pageSize) {
                      this.setState({
                        hasMore: false,
                        loadMore: false,
                        waterFallDatas: [res.data.returnDatas]
                      })
                    } else {
                      this.setState({
                        loadMore: false,
                        waterFallDatas: [res.data.returnDatas]
                      })
                    }
                  } else {
                    this.setState({ hasMore: false })
                  }
            })
        })
    }
    onChange(val) {
        this.setState({ value: val })
    }
    static defaultProps = {
        datas: [[{
            orderId: '',
            nameInput: '',
            newAndOldDegree: '',
            mode: '',
            objectOfPayment: '',
            payForMePrice: 0,
            payForOtherPrice: 0,
            wantExchangeGoods: '',
            topPicSrc: '',
            watchedPeople: 0,
            nickName: '',
            avatarUrl: ''
        }, {
            orderId: '',
            nameInput: '',
            newAndOldDegree: '',
            mode: '',
            objectOfPayment: '',
            payForMePrice: 0,
            payForOtherPrice: 0,
            wantExchangeGoods: '',
            topPicSrc: '',
            watchedPeople: 0,
            nickName: '',
            avatarUrl: ''
        }
        ]
        ],
        loadMore: false,
        hasMore: true
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() {

    }

    componentDidHide() { }

    render() {
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='search-container'>
                    <AtSearchBar
                        actionName='搜索'
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
                    <View className='water-fall'>
                        <WaterFall datas={this.props.datas} />
                        {this.props.loadMore ? <View className='loading'>
                            <AtActivityIndicator content='加载中...' color='#C41A16' mode='center' size={36}></AtActivityIndicator>
                        </View> : null}
                        {this.props.hasMore ? null : <AtDivider content='没有更多了!' fontColor='#C41A16' lineColor='#C41A16' />}
                    </View>
                </View>
            </Skeleton>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default SearchContent as ComponentClass<PageOwnProps, PageState>