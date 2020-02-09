import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import './index.scss'

function NotFoundComponent() {

  return (
    <View className='not-found-conatiner'>
        <Image src={`${CDNWebSite}/icon/not-found/not-found-icon.jpg`} className='icon'></Image>
        <Text className='text'>404 Not Found ,</Text>
        <View className='say'>您打开的商品为空！</View>
    </View>
  )
}

export default Taro.memo(NotFoundComponent)