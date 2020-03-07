import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import { AtToast } from "taro-ui"
import promiseApi from '../../utils/promiseApi'
import { QRCode } from 'taro-code'
import Tag from '../component-tag'
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
        salederPhone: string;
        salederAddress: string;
        buierPhone: string;
        buierAddress: string;
        buierAvatarUrl: string;
        orderCode: string;
        buierNickName: string;
    }
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TradingContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class TradingContent extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true,
        tradeSuccess:false,
        tradeFail:false
    }
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
            salederPhone: '',
            salederAddress: '',
            buierPhone: '',
            buierAddress: '',
            buierAvatarUrl: '',
            orderCode: '',
            buierNickName: ''
        }
    }
    componentDidMount() {
        this.setState({ loading: false })
        promiseApi(Taro.login)().then(loginResult => {
            if (loginResult.code) {
                Taro.connectSocket({
                    url: `wss://${server}:${port}`
                }).then(task => {
                    task.onOpen(function () {
                        task.send({
                            data: loginResult.code
                        })
                    })
                    task.onMessage( (msg)=>{
                        // console.log('onMessage: ', msg)
                        const res = JSON.parse(msg.data)
                        if(res.status==='success'){
                            promiseApi(Taro.navigateTo)({
                                url:'/pages/trade-success/trade-success'
                            })
                            task.close({})
                        }
                    })
                    task.onError(function () {
                        console.log('onError')
                    })
                    task.onClose(function (e) {
                        console.log('onClose: ', e)
                    })
                })
            }
        })
    }
    onClick() {
        promiseApi(Taro.scanCode)({
            onlyFromCamera: true,
            scanType: 'qrCode'
        }).then((res) => {
            const scanResult = res.result
            promiseApi(Taro.login)().then((loginResult) => {
                const code = loginResult.code
                if (code) {
                    promiseApi(Taro.request)({
                        url: `${protocol}://${server}:${port}/tradingscancode`,
                        method: 'POST',
                        data: {
                            code: code,
                            scanResult: scanResult
                        }
                    }).then((res) => {
                        if(res.statusCode!==200||res.data.status!=='success'){
                            this.setState({tradeFail:true})
                        }
                    })
                }
            })
        })
    }
    render() {
        const { avatarUrl, nickName, nameInput, goodsNumber, newAndOldDegree, payForMePrice, payForOtherPrice, wantExchangeGoods, topPic, orderId, school, salederPhone, salederAddress, buierPhone, buierAddress, buierAvatarUrl, orderCode, buierNickName } = this.props.datas
        return (
            <Skeleton
                row={1}
                rowHeight={60}
                animate
                loading={this.state.loading}
            >
                <View className='trading-container'>
                    <View className='goods-introduction'>
                        <View className='order-id'>
                            订单编号：{orderId}
                        </View>
                        <View className='goods-introduction-content'>
                            <Image src={topPic} className='img'></Image>
                            <View className='introduction'>
                                <View className='title'>{nameInput}</View>
                                <View className='degree-and-count'>
                                    <Tag title={newAndOldDegree + '新'} fontSize={'12px'} />
                                    <View className='count'>X {goodsNumber}</View>
                                </View>
                                <View className='price-info'>
                                    < View className='want-exchange'>买家需给卖家：{wantExchangeGoods}</View>
                                    <View className='pay-for-me'>买家需要支付：&yen; {payForMePrice}</View>
                                    <View className='pay-for-other'>买家将要收入：&yen; {payForOtherPrice}</View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='trading-content'>
                        <View className='main'>
                            <View className='col'>
                                <View className='nick-name'>{buierNickName}</View>
                                <Image src={buierAvatarUrl} className='avatar'></Image>
                                <View className='left'>
                                    <View>手机：{buierPhone}</View>
                                    <View>地址：{buierAddress}</View>
                                </View>
                            </View>
                            <View className='col'>
                                <View className='school'>
                                    <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/trading/school.png' className='icon'></Image>
                                    <View >{school}</View>
                                </View>

                                <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/trading/exchange.png' className='exchange-icon'></Image>
                            </View>
                            <View className='col'>
                                <View className='nick-name'>{nickName}</View>
                                <Image src={avatarUrl} className='avatar'></Image>
                                <View className='right'>
                                    <View>手机：{salederPhone}</View>
                                    <View>地址：{salederAddress}</View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='qr-code'>
                        <QRCode
                            text={orderCode}
                            size={200}
                            scale={2}
                            errorCorrectLevel='M'
                            typeNumber={3}
                        />
                        <View className='tip'>Tip:请双方扫码完成本次交易！</View>
                        <View hoverClass='hover' className='camera-conatiner' onClick={() => { this.onClick() }}>
                            <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/trading/camera.png' className='camera'></Image>
                        </View>
                        <AtToast isOpened={this.state.tradeFail} text="交易失败！" icon="close"></AtToast>
                    </View>
                </View>
            </Skeleton>
        )
    }
}
export default TradingContent as ComponentClass<PageOwnProps, PageState>