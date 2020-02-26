import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
import mapMode from '../../static-name/mapMode'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { AtToast } from "taro-ui"
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

type PageOwnProps = {
    datas: {
        avatarUrl: string;
        nickName: string;
        typeOne: string;
        typeTwo: string;
        typeThree: string;
        orderTime: string;
        nameInput: string;
        goodsNumber: number;
        newAndOldDegree: string;
        mode: string;
        objectOfPayment: string;
        payForMePrice: number;
        payForOtherPrice: number;
        wantExchangeGoods: string;
        topPic: string;
        orderId: string;
        school: string;
    }
}


type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ConfirmOrderContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ConfirmOrderContent extends Component {

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
        isOpened: false
    }
    text = '微信支付'
    isSuccess = true
    static defaultProps = {
        datas: {
            avatarUrl: '',
            nickName: '',
            typeOne: '',
            typeTwo: '',
            typeThree: '',
            orderTime: '',
            nameInput: '',
            goodsNumber: 0,
            newAndOldDegree: '',
            mode: '',
            objectOfPayment: '',
            payForMePrice: 0,
            payForOtherPrice: 0,
            wantExchangeGoods: '',
            topPic: '',
            orderId: '',
            school: '',
        }
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handlePay(orderId,payForMePrice,payForOtherPrice) {
        this.text = '微信支付...'
        this.isSuccess = false
        this.setState({ isOpened: true }, () => {
            promiseApi(Taro.login)().then((loginResult) => {
                const code = loginResult.code
                if (code) {
                    promiseApi(Taro.request)({
                        url: `${protocol}://${server}:${port}/pay`,
                        method: 'POST',
                        data: {
                            code: code,
                            orderId:orderId,
                            payForMePrice:parseFloat(payForMePrice),
                            payForOtherPrice:parseFloat(payForOtherPrice)
                        }
                    }).then((res) => {
                        if(res.statusCode===200&&res.data.status==='success'){
                            this.text = '支付成功！'
                            this.isSuccess = true
                            this.setState({ isOpened: true })
                        }
                    })
                }
            })
        })
    }
    render() {
        const datas = this.props.datas
        const { avatarUrl, nickName, typeOne, typeTwo, typeThree, orderTime, nameInput, goodsNumber, newAndOldDegree, mode, objectOfPayment, payForMePrice, payForOtherPrice, wantExchangeGoods, topPic, orderId, school } = datas
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='confirm-order-content'>
                    <View className='header'>
                        <View className='goods-order-header'>
                            <Image src={avatarUrl} className='avatar'></Image>
                            <View>{nickName}</View>
                        </View>
                        <View className='goods-order-content'>
                            <Image src={topPic} className='goods-pic'></Image>
                            <View className='goods-title'>
                                <View>{nameInput}</View>
                                <View className='degree-and-count'>
                                    <View className='degree'>成色：{mapNewAndOldDegree[newAndOldDegree]}</View>
                                    <View className='count'>X {goodsNumber}</View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='body'>
                        <View>订单编号：{orderId}</View>
                        <View>商品发布时间：{orderTime}</View>
                        <View>分类信息：{`${typeOne}/${typeTwo}/${typeThree}`}</View>
                        <View>交易学校：{school}</View>
                        <View>交易方式：{mapMode[mode]}</View>
                    </View>
                    <View className='footer'>
                        <View className='footer-header'>
                            价格/交换详情：
                        </View>
                        <View className='footer-content'>
                            {mode === 'directExchange' || mode === 'priceDifference' ? < View className='want-exchange'>您需要给卖家：{wantExchangeGoods}</View> : null}
                            {payForMePrice === 0 || mode === 'directSale' || (mode === 'priceDifference' && objectOfPayment === 'payForMe') ? <View className='pay-for-me'>您需要支付：&yen; {payForMePrice}</View> : null}
                            {(mode === 'priceDifference' && objectOfPayment === 'payForOther') ? <View className='pay-for-other'>您将要收入：&yen; {payForOtherPrice}</View> : null}
                        </View>
                    </View>
                    <View className='confirm-button' onClick={() => { this.handlePay(orderId,payForMePrice,payForOtherPrice) }}>
                        确认交易
                    </View>
                    <AtToast isOpened={this.state.isOpened} text={this.text} image={this.isSuccess ? '' : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/confirm-order/wechat-pay-white.png'} status={this.isSuccess ? 'success' : undefined} duration={1200} hasMask onClose={() => { 
                        if(this.isSuccess){
                            promiseApi(Taro.navigateTo)({
                                url: `/pages/trading/trading?avatarUrl=${avatarUrl}&orderTime=${orderTime}&typeOne=${typeOne}&typeTwo=${typeTwo}&typeThree=${typeThree}&nameInput=${nameInput}&goodsNumber=${goodsNumber}&newAndOldDegree=${newAndOldDegree}&mode=${mode}&objectOfPayment=${objectOfPayment}&payForMePrice=${payForMePrice}&payForOtherPrice=${payForOtherPrice}&wantExchangeGoods=${wantExchangeGoods}&topPic=${topPic}&nickName=${nickName}&orderId=${orderId}&school=${school}`
                             })
                        }
                     }}></AtToast>
                </View>
            </Skeleton >
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default ConfirmOrderContent as ComponentClass<PageOwnProps, PageState>