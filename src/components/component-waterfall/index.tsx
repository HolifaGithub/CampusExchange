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
    datas: datasType[]
}

function Waterfall(props: Props) {
    const { datas } = props;
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <Skeleton
            row={datas && datas.length > 0 ? datas.length : 2}
            rowHeight={450}
            animate
            loading={loading}
        >
            <View className='water-fall-container'>
                {(datas && datas.length > 0) ? datas.map((data, index) => {
                    const { orderId, nameInput, newAndOldDegree, mode, objectOfPayment, payForMePrice, payForOtherPrice, wantExchangeGoods, topPicSrc, watchedPeople, nickName, avatarUrl } = data
                    return (
                        <View className='water-fall-item' key={new Date().toString() + index} onClick={()=>{
                            Taro.navigateTo({
                                url:`/pages/goods-info/goods-info?orderId=${orderId}`
                            })
                        }}>
                            <Image className='water-fall-image' src={topPicSrc.length > 0 ? topPicSrc : 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/default.png'}></Image>
                            <View className='water-fall-title'><Text>{nameInput}</Text></View>
                            <View className='water-fall-content-container'>
                                <View className='price-bar'>
                                    {payForMePrice !== 0 || mode === 'directSale' ? <View className='water-fall-price-red'><Text>&yen;{payForMePrice}</Text></View> : null}
                                    {payForOtherPrice !== 0 ? <View className='water-fall-price-green'><Text>&yen;{payForOtherPrice}</Text></View> : null}
                                    {wantExchangeGoods !== '' || mode === 'directExchange' ? < View className='water-fall-price-exchange'>
                                        <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/exchange.png' className='exchange-image'></Image>
                                        <Text>{wantExchangeGoods}</Text>
                                    </View> : null}
                                    <Tag title={mapMode[mode]}></Tag>
                                    <Tag title={mapNewAndOldDegree[newAndOldDegree]}></Tag>                        
                                </View>
                                <Image className='water-fall-avater-image' src={avatarUrl}></Image>
                                <View className='water-fall-nick-name'><Text>{nickName}</Text>
                                </View>
                                <View className='water-fall-view-container'>
                                    <Image src={'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/water-fall/watched.png'} className='water-fall-view-image'></Image>
                                    <View className='water-falll-view-number'><Text>{watchedPeople}</Text></View>
                                </View>
                            </View>
                        </View>
                    )
                }) : null}
            </View >
        </Skeleton >
    )
}

export default Taro.memo(Waterfall)