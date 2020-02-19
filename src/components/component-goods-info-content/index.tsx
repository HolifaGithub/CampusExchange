import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { ScrollView, View, Text, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import Tag from '../component-tag'
import { server, port } from '../../static-name/server'
import { AtNavBar, AtAvatar, AtDivider } from 'taro-ui'
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
    payForMePrice: string;
    payForOtherPrice: string;
    wantExchangeGoods: string;
    describe: string;
    picsLocation: string;
    nickName: string;
    avatarUrl: string;
    school: string;
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
    payForMePrice: '',
    payForOtherPrice: '',
    wantExchangeGoods: '',
    describe: '',
    picsLocation: '',
    nickName: '',
    avatarUrl: '',
    school: ''
}
const SET_DATA = 'SET_DATA'
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
                                console.log(res.data)
                                dispatch({ type: SET_DATA, data: res.data })
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
                    <AtAvatar circle image='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/beauty-makeup/facial-care/fang-shai.png' size='large'></AtAvatar>
                    <View className='header-middle'>
                        <View className='nick-name'>{state.nickName}</View>
                        <View>
                            <View className='sort'>分  类：{state.typeOne}/{state.typeTwo}/{state.typeThree}</View>
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
                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-red.png' className='icon'></Image>
    <View>付给我：{state.payForMePrice}元</View>
                        </View>

                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-green.png' className='icon'></Image>
    <View className='pay-for-you'>付给你：{state.payForOtherPrice}元</View>
                        </View>
                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/exchange-orange.png' className='icon'></Image>
    <View className='want-exchange'>我想换：{state.wantExchangeGoods}</View>
                        </View>
                    </View>
                    <AtDivider content='文字介绍' fontColor='#C41A16' lineColor='#C41A16' />
                    <View className='.at-article__p article'>
                       {state.describe}
                    </View>
                    <AtDivider content='图片详情' fontColor='#C41A16' lineColor='#C41A16' />
                    <Image className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                    <Image className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                    <Image className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                </View>
                <View className='footer' style={{ top: top }}>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collect.png' className='footer-icon'></Image>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/chat-blue.png' className='footer-icon'></Image>
                    <View className='button'>交易</View>
                    <View className='blank'></View>
                </View>
            </View>
        </Skeleton>
    )
}

export default Taro.memo(GooodsInfoContent)