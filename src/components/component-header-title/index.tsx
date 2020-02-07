import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function HeaderTitle() {
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
      <View className='header-title-container'>
        <Image src={`${CDNWebSite}/icon/header-title/wing-left.png`} className='header-title-image'></Image>
        <Text className='header-title'>猜你喜欢</Text>
        <Image src={`${CDNWebSite}/icon/header-title/wing-right.png`} className='header-title-image'></Image>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(HeaderTitle)