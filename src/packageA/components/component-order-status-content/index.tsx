import Taro, { PureComponent } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import { server, port, protocol } from '../../../static-name/server'
import promiseApi from '../../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import './index.scss'
import { View, Image } from '@tarojs/components'
import Tag from '../../../components/component-tag'

type PageStateProps = {

}

type PageDispatchProps = {

}

interface OrderListReturnDatas {
    orderId: string;
    nameInput: string;
    newAndOldDegree: string;
    topPicSrc: string;
    typeOne: string;
    typeTwo: string;
    typeThree: string;
    goodsNumber: string;
}
type PageOwnProps = {
    datas: OrderListReturnDatas[],
    orderInfo: string;
}

type PageState = {
    loading: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface OrderStatusContent {
    props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class OrderStatusContent extends PureComponent {
    constructor(props) {
        super(props)
    }
    state = {
        loading: true
    }
    defaultProps = {
        datas: [
            {
                orderId: '',
                nameInput: '',
                newAndOldDegree: '',
                topPicSrc: '',
                typeOne: '',
                typeTwo: '',
                typeThree: '',
                goodsNumber: '',
            }
        ]
    }
    timer
    componentWillMount() {
        this.timer = setTimeout(() => {
            this.setState({ loading: false })
        }, 500);
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    componentDidShow() {

    }

    componentDidHide() { }
    onClick(orderId, orderInfo) {
        if (orderInfo !== 'trading') {
            promiseApi(Taro.navigateTo)({
                url: `/pages/goods-info/goods-info?orderId=${orderId}`
            })
        } else {
            // promiseApi(Taro.navigateTo)({
            //     url: `/pages/trading/trading`
            // })
            let fetchDataResult: any = {}
            promiseApi(Taro.login)().then((loginResult) => {
                const code = loginResult.code
                if (code) {
                    promiseApi(Taro.request)({
                        url: `${protocol}://${server}:${port}/getgoodsinfo`,
                        method: 'GET',
                        data: {
                            code: code,
                            orderId: orderId
                        }
                    }).then((res) => {
                        if (res.statusCode === 200 && res.data.status === 'success') {
                            let pics = res.data.picsLocation
                            pics = pics.split(";")
                            if (pics[pics.length - 1] === '') {
                                pics.pop()
                            }
                            for (let i = 0; i < pics.length; i++) {
                                if (pics[i] !== '') {
                                    pics[i] = `https://${pics[i]}`
                                } else {
                                    pics.splice(i, 1)
                                }
                            }
                            let topPic = pics.length > 0 ? pics[0] : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'
                            fetchDataResult = { ...res.data }
                            const { avatarUrl, orderTime, typeOne, typeTwo, typeThree, nameInput, goodsNumber, newAndOldDegree, mode, objectOfPayment, payForMePrice, payForOtherPrice, wantExchangeGoods, nickName, orderId, school } = fetchDataResult
                            promiseApi(Taro.navigateTo)({
                                url: `/pages/trading/trading?avatarUrl=${avatarUrl}&orderTime=${orderTime}&typeOne=${typeOne}&typeTwo=${typeTwo}&typeThree=${typeThree}&nameInput=${nameInput}&goodsNumber=${goodsNumber}&newAndOldDegree=${newAndOldDegree}&mode=${mode}&objectOfPayment=${objectOfPayment}&payForMePrice=${payForMePrice}&payForOtherPrice=${payForOtherPrice}&wantExchangeGoods=${wantExchangeGoods}&topPic=${topPic}&nickName=${nickName}&orderId=${orderId}&school=${school}`
                            })
                        }
                    })
                }
            })
        }
    }
    render() {
        const orderInfo = this.props.orderInfo
        return (
            <View>
                {this.props.datas ? (this.props.datas.map((data, index) => {
                    return (
                        <View className='goods-introduction' key={new Date().toString() + index} onClick={() => { this.onClick(data.orderId, orderInfo) }}>
                            <Skeleton
                                row={1}
                                rowHeight={40}
                                rowWidth={'100%'}
                                animate
                                loading={this.state.loading}
                            >
                                <View className='order-id'>
                                    订单编号：{data.orderId}
                                </View>
                            </Skeleton>
                            <Skeleton
                                row={2}
                                avatar
                                avatarSize={120}
                                avatarShape='square'
                                rowHeight={40}
                                rowWidth={'100%'}
                                animate
                                loading={this.state.loading}
                            >
                                <View className='goods-introduction-content'>
                                    <Image src={data.topPicSrc.length > 0 ? data.topPicSrc : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'} className='img'></Image>
                                    <View className='introduction'>
                                        <View className='title'>{data.nameInput}</View>
                                        <View className='sort'>{data.typeOne}/{data.typeTwo}/{data.typeThree}</View>
                                        <View className='degree-and-count'>
                                            <Tag title={data.newAndOldDegree + '新'} fontSize={'12px'} />
                                            <View className='count'>数量： {data.goodsNumber}</View>
                                        </View>
                                    </View>
                                </View>
                            </Skeleton>
                        </View>
                    )
                })) : null}

            </View>
        )
    }
}

export default OrderStatusContent as ComponentClass<PageOwnProps, PageState>