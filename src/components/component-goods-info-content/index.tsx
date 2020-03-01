import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import {View, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import promiseApi from '../../utils/promiseApi'
import { server, port } from '../../static-name/server'
import GoodsInfoHeader from '../component-goods-info-header'
import { AtNavBar, AtDivider, AtToast } from 'taro-ui'
import './index.scss'
interface Props {
    data: {};
}
interface InitState {
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
}
const initState: InitState = {
    orderId: '',
    orderTime: '',
    orderStatus: '',
    typeOne: '',
    typeTwo: '',
    typeThree: '',
    nameInput: '',
    goodsNumber: 1,
    newAndOldDegree: '',
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
    isCollect: false
}
const SET_DATA = 'SET_DATA'
const COLLECT = 'COLLECT'
const CANCLE_COLLECT = 'CANCLE_COLLECT'
function reducer(state = initState, action) {
    switch (action.type) {
        case SET_DATA:
            return Object.assign({}, state, {
                orderId: action.data.orderId,
                orderTime: action.data.orderTime,
                orderStatus: action.data.orderStatus,
                typeOne: action.data.typeOne,
                typeTwo: action.data.typeTwo,
                typeThree: action.data.typeThree,
                nameInput: action.data.nameInput,
                goodsNumber: action.data.goodsNumber,
                newAndOldDegree: action.data.newAndOldDegree,
                mode: action.data.mode,
                objectOfPayment: action.data.objectOfPayment,
                payForMePrice: action.data.payForMePrice,
                payForOtherPrice: action.data.payForOtherPrice,
                wantExchangeGoods: action.data.wantExchangeGoods,
                describe: action.data.describe,
                picsLocation: action.data.picsLocation,
                nickName: action.data.nickName,
                avatarUrl: action.data.avatarUrl,
                school: action.data.school
            })
        case COLLECT:
            return Object.assign({}, state, { isCollect: true })
        case CANCLE_COLLECT:
            return Object.assign({}, state, { isCollect: false })
        default:
            return state
    }
}
function GooodsInfoContent(props: Props) {
    let [loading, setLoading] = useState(true)
    let [state, dispatch] = useReducer(reducer, initState)
    let top = ''
    Taro.getSystemInfo({
        success(res) {
            top = (res.windowHeight - 75) + 'px'
        }
    })
    useEffect(() => {
        setLoading(false)
        dispatch({ type: SET_DATA, data: props.data })
    }, [props.data])
    return (
        <Skeleton
            row={1}
            rowHeight={60}
            animate
            loading={loading}
        >
            <View className='goods-info-content'>
                <AtNavBar
                    color='#000'
                    title={state.nameInput}
                    border
                />
                <GoodsInfoHeader datas={state}/>
                <View className='body'>
                    <View className='price'>
                        {state.payForMePrice === 0 ? null : <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-red.png' className='icon'></Image>
                            <View>付给我：{state.payForMePrice}元</View>
                        </View>
                        }
                        {state.payForOtherPrice === 0 ? null : <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-green.png' className='icon'></Image>
                            <View className='pay-for-you'>付给你：{state.payForOtherPrice}元</View>
                        </View>}
                        {state.wantExchangeGoods === '' ? null : <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/exchange-orange.png' className='icon'></Image>
                            <View className='want-exchange'>我想换：{state.wantExchangeGoods}</View>
                        </View>}
                    </View>
                    <AtDivider content='文字介绍' fontColor='#C41A16' lineColor='#C41A16' />
                    <View className='.at-article__p article'>
                        {state.describe.length > 0 ? state.describe : <View>此商品无文字介绍!</View>}
                    </View>
                    <AtDivider content='图片详情' fontColor='#C41A16' lineColor='#C41A16' />
                    {state.picsLocation&&state.picsLocation.length > 0 ? state.picsLocation.map((pic, index) => {
                        return (
                            <Image className='goods-img' src={pic} key={new Date().toString()}></Image>
                        )
                    }) : <View>此商品无图片详情!</View>
                    }
                </View>
                <View className='footer' style={{ top: top }}>
                    <View onClick={() => {
                        if (state.isCollect) {
                            dispatch({ type: CANCLE_COLLECT })
                        } else {
                            dispatch({ type: COLLECT })
                        }
                    }}>
                        {state.isCollect ? <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collected.png' className='footer-icon'></Image> : <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collect.png' className='footer-icon'></Image>}
                        <AtToast isOpened={state.isCollect} text='收藏成功！' status='success' duration={1000}></AtToast>
                    </View>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/chat-blue.png' className='footer-icon'></Image>
                    <View className='button' onClick={()=>{
                        let topPic=state.picsLocation.length>0?state.picsLocation[0]:'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'
                        promiseApi(Taro.navigateTo)({
                           url: `/pages/confirm-order/confirm-order?avatarUrl=${state.avatarUrl}&orderTime=${state.orderTime}&typeOne=${state.typeOne}&typeTwo=${state.typeTwo}&typeThree=${state.typeThree}&nameInput=${state.nameInput}&goodsNumber=${state.goodsNumber}&newAndOldDegree=${state.newAndOldDegree}&mode=${state.mode}&objectOfPayment=${state.objectOfPayment}&payForMePrice=${state.payForMePrice}&payForOtherPrice=${state.payForOtherPrice}&wantExchangeGoods=${state.wantExchangeGoods}&topPic=${topPic}&nickName=${state.nickName}&orderId=${state.orderId}&school=${state.school}`
                        })
                    }}>交易</View>
                    <View className='blank'></View>
                </View>
            </View>
        </Skeleton>
    )
}
GooodsInfoContent.defaultProps = {
    data: {
        status:'',
        orderId: '',
        orderTime: '',
        orderStatus: '',
        typeOne: '',
        typeTwo: '',
        typeThree: '',
        nameInput: '',
        goodsNumber: 1,
        newAndOldDegree: '',
        mode: '',
        objectOfPayment: '',
        payForMePrice: 0,
        payForOtherPrice: 0,
        wantExchangeGoods: '',
        describe: '',
        picsLocation: '',
        nickName: '',
        avatarUrl: '',
        school: ''
    }
}
export default Taro.memo(GooodsInfoContent)