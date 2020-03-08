import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import getSystemInfo from '../../utils/getSystemInfo'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import { AtToast } from 'taro-ui'
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
    top: string;
    _isCollage: boolean;
    isOnClick: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface GoodsInfoFooter {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class GoodsInfoFooter extends Component {

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
        top: '',
        _isCollage: false,
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
    onclick() {
        promiseApi(Taro.login)().then(loginResult => {
            if (loginResult.code) {
                promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/collect`,
                    method: 'POST',
                    data: {
                        code: loginResult.code,
                        orderId: this.props.datas.orderId
                    }
                }).then(res => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                        this.setState((prevState: PageState) => {
                            return {
                                _isCollage: !prevState._isCollage,
                                isOnClick: true
                            }
                        })
                    }
                })
            }
        })

    }
    componentWillMount() {
        const top = (getSystemInfo().windowHeight - 75) + 'px'
        this.setState({ top: top })
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ _isCollage: nextProps.datas.isCollect })
    }
    onChatClick(orderId){
        this.$preload('orderId', orderId)
        promiseApi(Taro.navigateTo)({
            url:'/pages/chat-info/chat-info'
        })
    }
    render() {
        const { avatarUrl, orderTime, orderStatus, orderId, typeOne, typeTwo, typeThree, nameInput, goodsNumber, newAndOldDegree, mode, objectOfPayment, payForMePrice, payForOtherPrice, wantExchangeGoods, picsLocation, nickName, school, isCollect } = this.props.datas
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='footer' style={{ top: this.state.top }}>
                    <View onClick={() => {
                        this.onclick()
                    }}>
                        {this.state._isCollage ? <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collected.png' className='footer-icon'></Image> : <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collect.png' className='footer-icon'></Image>}
                        <AtToast isOpened={(isCollect && (!this.state.isOnClick)) ? false : this.state._isCollage} text='收藏成功！' status='success' duration={1000}></AtToast>
                    </View>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/chat-blue.png' className='footer-icon' onClick={()=>{
                        this.onChatClick(orderId)
                    }}></Image>
                    {orderStatus === 'released' ? (<View className='button' onClick={() => {
                        let topPic = picsLocation.length > 0 ? picsLocation[0] : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'
                        promiseApi(Taro.navigateTo)({
                            url: `/pages/confirm-order/confirm-order?avatarUrl=${avatarUrl}&orderTime=${orderTime}&typeOne=${typeOne}&typeTwo=${typeTwo}&typeThree=${typeThree}&nameInput=${nameInput}&goodsNumber=${goodsNumber}&newAndOldDegree=${newAndOldDegree}&mode=${mode}&objectOfPayment=${objectOfPayment}&payForMePrice=${payForMePrice}&payForOtherPrice=${payForOtherPrice}&wantExchangeGoods=${wantExchangeGoods}&topPic=${topPic}&nickName=${nickName}&orderId=${orderId}&school=${school}`
                        })
                    }}>交易</View>) : <View className='off'>已下架</View>}
                    <View className='blank'></View>
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

export default GoodsInfoFooter as ComponentClass<PageOwnProps, PageState>