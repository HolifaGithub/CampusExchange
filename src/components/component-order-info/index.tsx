import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import { AtBadge } from 'taro-ui'
import './index.scss'

function OrderInfo() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='order-info-container'>
        <View className='order-info-header-title'>我的交易</View>
        <View className='order-info-content'>
          <View className='order-info-one'>
            <AtBadge value={6}>
              <Image src={`${CDNWebSite}/icon/user-info/release.png`} className='icon'></Image>
            </AtBadge>
            <Text>我发布的</Text>
          </View>
          <View className='order-info-one'>
            <AtBadge value={2}>
              <Image src={`${CDNWebSite}/icon/user-info/transaction.png`} className='icon'></Image>
            </AtBadge>
            <Text>交易中的</Text>
          </View>
          <View className='order-info-one'>
            <AtBadge value={3}>
              <Image src={`${CDNWebSite}/icon/user-info/buy.png`} className='icon'></Image>
            </AtBadge>
            <Text>我买到的</Text>
          </View>
          <View className='order-info-one'>
            <AtBadge value={2}>
              <Image src={`${CDNWebSite}/icon/user-info/sale.png`} className='icon'></Image>
            </AtBadge>
            <Text>我卖出的</Text>
          </View>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(OrderInfo)