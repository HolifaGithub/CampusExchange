import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Tag from '../component-tag'
import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
import mapMode from '../../static-name/mapMode'
import Skeleton from 'taro-skeleton'
import './index.scss'

type datasType = {
    orderId: string;
    nameInput: string;
    newAndOldDegree: string;
    mode: string;
    objectOfPayment: string;
    payForMePrice: number;
    payForOtherPrice: number;
    wantExchangeGoods: string;
    topPicSrc: string;
    watchedPeople: number;
    nickName: string;
    avatarUrl: string;
}
interface Props {
    datas: datasType[][]
}

function Waterfall(props: Props) {
    const { datas } = props;
    let [loading, setLoading] = useState(true)
    var timer
    useEffect(() => {
        timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [])
    // console.log('component', props.datas)
    return (
        <View>
            {datas && datas.length > 0 ? (<View>
                {(datas && datas.length > 0) ? datas.map((onePage, index1) => {
                    return (<View key={new Date().toString() + index1} className='water-fall-container'>
                        {
                            (onePage && onePage.length > 0) ? onePage.map((data, index2) => {
                                const { orderId, nameInput, newAndOldDegree, mode, objectOfPayment, payForMePrice, payForOtherPrice, wantExchangeGoods, topPicSrc, watchedPeople, nickName, avatarUrl } = data
                                return (
                                    <View className='water-fall-item' onClick={() => {
                                        Taro.navigateTo({
                                            url: `/pages/goods-info/goods-info?orderId=${orderId}`
                                        })
                                    }}
                                        key={orderId}
                                    >
                                        <Skeleton
                                            row={1}
                                            rowHeight={210}
                                            rowWidth={'100%'}
                                            animate
                                            loading={loading}
                                        >
                                            <Image className='water-fall-image' src={topPicSrc.length > 0 ? topPicSrc : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'}></Image>
                                        </Skeleton>
                                        <Skeleton
                                            row={1}
                                            rowHeight={80}
                                            rowWidth={'100%'}
                                            animate
                                            loading={loading}
                                            key={new Date().toString() + index2}
                                        >
                                            <View className='water-fall-title'><Text>{nameInput}</Text></View>
                                        </Skeleton>
                                        <Skeleton
                                            row={1}
                                            avatar
                                            avatarSize={50}
                                            rowHeight={50}
                                            rowWidth={'100%'}
                                            animate
                                            loading={loading}
                                            key={new Date().toString() + index2}
                                        >
                                            <View className='water-fall-content-container'>
                                                <View className='price-tag'>
                                                    <View className='price-bar'>
                                                        {payForMePrice !== 0 || mode === 'directSale' ? <View className='water-fall-price-red'><Text>&yen;{payForMePrice}</Text></View> : null}
                                                        {payForOtherPrice !== 0 ? <View className='water-fall-price-green'><Text>&yen;{payForOtherPrice}</Text></View> : null}
                                                        {wantExchangeGoods !== '' || mode === 'directExchange' ? < View className='water-fall-price-exchange'>
                                                            <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/exchange.png' className='exchange-image'></Image><Text>{wantExchangeGoods}</Text>
                                                        </View> : null}
                                                    </View>
                                                    <Tag title={mapMode[mode]} fontSize={'11px'} backgroundColor={'#efb336'}></Tag>
                                                    <Tag title={mapNewAndOldDegree[newAndOldDegree]} fontSize={'11px'}></Tag>
                                                </View>
                                                <View className='footer'>
                                                    <Image className='water-fall-avater-image' src={avatarUrl}></Image>

                                                    <View className='water-fall-nick-name'><Text>{nickName}</Text>
                                                    </View>
                                                    <View className='water-fall-view-container'>
                                                        <Image src={'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/watched.png'} className='water-fall-view-image'></Image>
                                                        <View className='water-falll-view-number'><Text>{watchedPeople}</Text></View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Skeleton>
                                    </View>
                                )
                            }) : null
                        }
                    </View>)
                }) : null}

            </View >) : (<Skeleton
                row={1}
                rowWidth={'100%'}
                rowHeight={300}
                animate
                loading={loading}
            >
                <View className='no-data'>暂无推荐!</View>
            </Skeleton>)
            }
        </View >
    )
}

export default Taro.memo(Waterfall)