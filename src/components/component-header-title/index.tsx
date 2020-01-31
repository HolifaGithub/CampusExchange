import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import './index.scss'

function HeaderTitle() {
  return (
    <View className='header-title-conatiner'>
      <Image src={`${CDNWebSite}/icon/header-title/wing-left.png`} className='header-title-image'></Image>
      <Text className='header-title'>猜你喜欢</Text>
      <Image src={`${CDNWebSite}/icon/header-title/wing-right.png`} className='header-title-image'></Image>
    </View>
  )
}

export default Taro.memo(HeaderTitle)