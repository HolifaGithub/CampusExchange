import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function Balance() {
    let [loading, setLoading] = useState(true)
    let [balance, setBalance] = useState(1888.8)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <Skeleton
            row={1}
            rowHeight={60}
            animate
            loading={loading}
        >
            <View className='balance-container'>
                <View className='balance-content-container'>
                    <Image src={`${CDNWebSite}/icon/user-info/balance.png`} className='balance-image'></Image>
                    <Text className='balance'>余额:{balance}元</Text>
                </View>
            </View>
        </Skeleton>
    )
}

export default Taro.memo(Balance)