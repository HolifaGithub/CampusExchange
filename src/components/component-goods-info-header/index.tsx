import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Tag from '../component-tag'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import { AtAvatar, AtToast } from 'taro-ui'
import promiseApi from '../../utils/promiseApi'
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
interface PropsType {
    orderId: string;
    orderTime: string;
    orderStatus: string;
    typeOne: string;
    typeTwo: string;
    typeThree: string;
    nameInput: string;
    goodsNumber: number;
    newAndOldDegree: string;
    mode: string;
    objectOfPayment: string;
    payForMePrice: number;
    payForOtherPrice: number;
    wantExchangeGoods: string;
    describe: string;
    picsLocation: string[];
    nickName: string;
    avatarUrl: string;
    school: string;
    isCare: boolean;
    isCollect: boolean;
    isMe: boolean;
}
type PageOwnProps = {
    datas: PropsType
}

type PageState = {
    loading: boolean;
    _isCare: boolean;
    isOnClick: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface GoodsInfoHeader {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class GoodsInfoHeader extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        _isCare: false,
        isOnClick: false
    }
    static defaultProps = {
        datas: {
            orderId: '',
            orderTime: '',
            orderStatus: '',
            typeOne: '',
            typeTwo: '',
            typeThree: '',
            nameInput: '',
            goodsNumber: 1,
            newAndOldDegree: '100',
            mode: '',
            objectOfPayment: '',
            payForMePrice: 0,
            payForOtherPrice: 0,
            wantExchangeGoods: '',
            describe: '',
            picsLocation: [''],
            nickName: '',
            avatarUrl: '',
            school: '',
            isCare: false,
            isCollect: false,
            isMe: false
        }
    }
    componentDidMount() {
        this.setState({
            loading: false
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ _isCare: nextProps.datas.isCare })
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
                <View className='header'>
                    <AtAvatar circle image={this.props.datas.avatarUrl} size='large'></AtAvatar>
                    <View className='header-middle'>
                        <View className='nick-name'>
                            <View>{this.props.datas.nickName}</View>
                            {this.props.datas.isMe ? null:(<View className='care' style={{ backgroundColor: this.state._isCare ? '#eee' : '' }} hoverClass='hover'>
                                <Image src={this.state._isCare ? `${CDNWebSite}/icon/goods-info/cared.png` : `${CDNWebSite}/icon/goods-info/care.png`} className='icon'></Image>
                                <View className='text' onClick={() => {
                                    promiseApi(Taro.login)().then(loginResult => {
                                        if (loginResult.code) {
                                            promiseApi(Taro.request)({
                                                url: `${protocol}://${server}:${port}/care`,
                                                method: 'POST',
                                                data: {
                                                    code: loginResult.code,
                                                    orderId: this.props.datas.orderId
                                                }
                                            }).then(res => {
                                                if (res.statusCode === 200 && res.data.status === 'success') {
                                                    this.setState((prevState: PageState) => {
                                                        return {
                                                            _isCare: !prevState._isCare,
                                                            isOnClick: true
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }}>{this.state._isCare ? '已关注' : '关注'}</View>
                                <AtToast isOpened={(this.props.datas.isCare && (!this.state.isOnClick)) ? false : this.state._isCare} text={'关注成功!'} status='success' duration={1000}></AtToast>
                            </View>)}
                        </View>
                        <View>
                            <View className='sort'>分 类：{this.props.datas.typeOne}/{this.props.datas.typeTwo}/{this.props.datas.typeThree}</View>
                            <View className='school'>发布于：{this.props.datas.school} </View>
                            <View className="time"> 时 间：{this.props.datas.orderTime}</View>
                        </View>
                    </View>
                    <View className='header-right'>
                        <View className="count">
                            数量：{this.props.datas.goodsNumber}
                        </View>
                        <View className='new-and-old-degree'>
                            <View>成色：</View>
                            <Tag title={`${this.props.datas.newAndOldDegree}新`} />
                        </View>
                    </View>
                </View>
            </Skeleton>
        )
    }
}
export default GoodsInfoHeader as ComponentClass<PageOwnProps, PageState>