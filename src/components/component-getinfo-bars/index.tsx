import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function GetInfoBars(props) {
  let [loading, setLoading] = useState(true)
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
      <View className='get-info-bars-container'>
        <View className='get-info-bar-container'>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/recharge.png`}></Image>
          <Text>充值</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container'>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/follow-person.png`}></Image>
          <Text>关注</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container'>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/collection.png`}></Image>
          <Text>收藏</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container'>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/card-ticket.png`}></Image>
          <Text>卡券</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(GetInfoBars)