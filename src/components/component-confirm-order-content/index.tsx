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
    constructor(props) {
        super(props)
    }
    state = {
        isSuccessOpened: false,
        isFlaseOpened: false
    }
    text = '微信支付'
    isSuccess = true
    isFalse = false
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

    componentDidHide() { }
    handlePay(orderId, payForMePrice, payForOtherPrice) {
        this.text = '微信支付...'
        this.isSuccess = false
        this.setState({ isSuccessOpened: true }, () => {
            promiseApi(Taro.login)().then((loginResult) => {
                const code = loginResult.code
                if (code) {
                    promiseApi(Taro.request)({
                        url: `${protocol}://${server}:${port}/pay`,
                        method: 'POST',
                        data: {
                            code: code,
                            orderId: orderId,
                            payForMePrice: parseFloat(payForMePrice),
                            payForOtherPrice: parseFloat(payForOtherPrice)
                        }
                    }).then((res) => {
                        if (res.statusCode === 200 && res.data.status === 'success') {
                            this.text = '支付成功！'
                            this.isSuccess = true
                            this.setState({ isSuccessOpened: true })
                        } else {
                            this.text = '支付失败!'
                            this.isFalse = true
                            this.setState({ isFlaseOpened: true })
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
                    <View className='confirm-button' onClick={() => { this.handlePay(orderId, payForMePrice, payForOtherPrice) }}>
                        确认交易
                    </View>
                    <AtToast isOpened={this.state.isSuccessOpened} text={this.text} image={this.isSuccess ? '' : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/confirm-order/wechat-pay-white.png'} status={this.isSuccess ? 'success' : undefined} duration={1200} hasMask onClose={() => {
                        if (this.isSuccess) {
                            promiseApi(Taro.navigateTo)({
                                url: `/pages/trading/trading?avatarUrl=${avatarUrl}&orderTime=${orderTime}&typeOne=${typeOne}&typeTwo=${typeTwo}&typeThree=${typeThree}&nameInput=${nameInput}&goodsNumber=${goodsNumber}&newAndOldDegree=${newAndOldDegree}&mode=${mode}&objectOfPayment=${objectOfPayment}&payForMePrice=${payForMePrice}&payForOtherPrice=${payForOtherPrice}&wantExchangeGoods=${wantExchangeGoods}&topPic=${topPic}&nickName=${nickName}&orderId=${orderId}&school=${school}`
                            })
                        }
                    }}></AtToast>
                    <AtToast isOpened={this.state.isFlaseOpened} text={this.text} status='error' duration={1200} hasMask ></AtToast>
                </View>
        )
    }
}
export default ConfirmOrderContent as ComponentClass<PageOwnProps, PageState>