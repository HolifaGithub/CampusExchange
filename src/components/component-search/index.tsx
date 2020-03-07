import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import NotFound from '../../components/componnent-not-found'
import AtSearchBarComponent from '../component-at-search-bar'
import { AtSearchBar, AtDivider, AtActivityIndicator } from 'taro-ui'
import WaterFall from '../component-waterfall'
import Skeleton from 'taro-skeleton'
import './index.scss'

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

type PageState = {
    loading: boolean;
    value: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SearchContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class SearchContent extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        value: '',
    }
    pageSize = 6
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
                    <AtSearchBarComponent />
                    <View className='water-fall'>
                        {(this.props.datas && this.props.datas.length > 0) ? (<WaterFall datas={this.props.datas} />) : (<NotFound />)}
                        {this.props.loadMore ? <View className='loading'>
                            <AtActivityIndicator content='加载中...' color='#C41A16' mode='center' size={36}></AtActivityIndicator>
                        </View> : null}
                        {this.props.hasMore ? null : <View className='not-more'>----------- 没有更多了！-----------</View>}
                    </View>
                </View>
            </Skeleton>
        )
    }
}
export default SearchContent as ComponentClass<PageOwnProps, PageState>