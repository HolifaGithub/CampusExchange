import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port, protocol } from '../../static-name/server'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { QRCode } from 'taro-code'
import Tag from '../component-tag'
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
        salederPhone: string;
        salederAddress: string;
        buierPhone: string;
        buierAddress: string;
        buierAvatarUrl: string;
        orderCode: string;
        buierNickName:string;
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
    }
    static defaultProps ={
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
            salederPhone:'',
            salederAddress:'',
            buierPhone:'',
            buierAddress:'',
            buierAvatarUrl:'',
            orderCode:'',
            buierNickName:''
        }
    }
    componentDidMount() {
        this.setState({ loading: false })
    }
    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const {avatarUrl, nickName, nameInput, goodsNumber, newAndOldDegree, payForMePrice, payForOtherPrice, wantExchangeGoods, topPic, orderId, school,salederPhone,salederAddress,buierPhone,buierAddress,buierAvatarUrl,orderCode,buierNickName} =this.props.datas
        console.log(orderCode)
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
                                    <Tag title={newAndOldDegree+'新'} fontSize={'12px'} />
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
                                <Image src={buierAvatarUrl}className='avatar'></Image>
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

export default TradingContent as ComponentClass<PageOwnProps, PageState>