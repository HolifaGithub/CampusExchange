import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import {View, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import promiseApi from '../../utils/promiseApi'
import { server, port } from '../../static-name/server'
import GoodsInfoHeader from '../component-goods-info-header'
import GoodsInfoFooter from '../component-goods-info-footer'
import { AtNavBar, AtDivider } from 'taro-ui'
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
    isMe:boolean;
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
    isCollect: false,
    isMe:false
}
const SET_DATA = 'SET_DATA'
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
                school: action.data.school,
                isCare:action.data.isCare,
                isCollect:action.data.isCollect,
                isMe:action.data.isMe
            })
        default:
            return state
    }
}
function GooodsInfoContent(props: Props) {
    let [loading, setLoading] = useState(true)
    let [state, dispatch] = useReducer(reducer, initState)

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
               { state.isMe?null:(<GoodsInfoFooter datas={state}/>)}
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