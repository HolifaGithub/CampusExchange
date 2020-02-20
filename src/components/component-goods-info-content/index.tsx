import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { ScrollView, View, Text, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import Tag from '../component-tag'
import { server, port } from '../../static-name/server'
import formatDate from '../../utils/formatDate'
import { AtNavBar, AtAvatar, AtDivider, AtToast } from 'taro-ui'
import './index.scss'
interface Props {
    orderId: string;
}
interface InitState {
    orderId: string;
    orderTime: string;
    orderStatus: string;
    openid: string;
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
    picsLocation: [];
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
    openid: '',
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
    picsLocation: [],
    nickName: '',
    avatarUrl: '',
    school: '',
    isCare: false,
    isCollect: false
}
const SET_DATA = 'SET_DATA'
const CARE = 'CARE'
const CANCLE_CARE = 'CANCLE_CARE'
const COLLECT = 'COLLECT'
const CANCLE_COLLECT = 'CANCLE_COLLECT'
function reducer(state = initState, action) {
    switch (action.type) {
        case SET_DATA:
            return Object.assign({}, state, {
                orderId: action.data.orderId,
                orderTime: action.data.orderTime,
                orderStatus: action.data.orderStatus,
                openid: action.data.openid,
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
        case CARE:
            return Object.assign({}, state, { isCare: true })
        case CANCLE_CARE:
            return Object.assign({}, state, { isCare: false })
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
    const orderId = props.orderId
    let top = ''
    Taro.getSystemInfo({
        success(res) {
            top = (res.windowHeight - 75) + 'px'
        }
    })
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)
        Taro.login({
            success(loginResult) {
                const code = loginResult.code
                if (code) {
                    Taro.request({
                        url: `http://${server}:${port}/getgoodsinfo`,
                        method: 'GET',
                        data: {
                            code: code,
                            orderId: orderId
                        },
                        success(res) {
                            if (res.statusCode === 200 && res.data.status === 'success') {
                                let pics = res.data.picsLocation
                                pics = pics.split(";")
                                if (pics[pics.length - 1] === '') {
                                    pics.pop()
                                }
                                for (let i = 0; i < pics.length; i++) {
                                   if(pics[i]!==''){
                                    pics[i] = `https://${pics[i]}`
                                   }else{
                                       pics.splice(i,1)
                                   }                                                      
                                }
                                console.log(pics)
                                const formatResult = formatDate(res.data.orderTime)
                                let date = `${formatResult.year}/${formatResult.month}/${formatResult.day} ${formatResult.hour}:${formatResult.minute}:${formatResult.second}`
                                dispatch({ type: SET_DATA, data: { ...res.data, picsLocation: pics, orderTime: date } })
                            }
                        }
                    })
                }
            }
        })
    }, [])
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
                <View className='header'>
                    <AtAvatar circle image={state.avatarUrl} size='large'></AtAvatar>
                    <View className='header-middle'>
                        <View className='nick-name'>
                            <View>{state.nickName}</View>
                            <View className='care'>
                                <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/goods-info/care.png' className='icon'></Image>
                                <View className='text' onClick={() => {
                                    if (state.isCare) {
                                        dispatch({ type: CANCLE_CARE })
                                    } else {
                                        dispatch({ type: CARE })
                                    }
                                }}>{state.isCare?'已关注':'关注'}</View>
                                <AtToast isOpened={state.isCare} text='关注成功！' status='success' duration={1000}></AtToast>
                            </View>
                        </View>
                        <View>
                            <View className='sort'>分 类：{state.typeOne}/{state.typeTwo}/{state.typeThree}</View>
                            <View className='school'>发布于：{state.school} </View>
                            <View className="time"> 时 间：{state.orderTime}</View>
                        </View>
                    </View>
                    <View className='header-right'>
                        <View className="count">
                            数量：{state.goodsNumber}
                        </View>
                        <View className='new-and-old-degree'>
                            <View>成色：</View>
                            <Tag title={`${state.newAndOldDegree}新`} />
                        </View>
                    </View>
                </View>
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
                    {state.picsLocation.length > 0 ? state.picsLocation.map((pic, index) => {
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
                    <View className='button'>交易</View>
                    <View className='blank'></View>
                </View>
            </View>
        </Skeleton>
    )
}

export default Taro.memo(GooodsInfoContent)