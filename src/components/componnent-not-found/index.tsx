import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import './index.scss'

function NotFoundComponent() {

  return (
    <View className='not-found-conatiner'>
        <Image src={`${CDNWebSite}/icon/not-found/404.png`} className='icon'></Image>
        <View className='text'>
        <Text>404 Not Found</Text>
        <View>空空如也~~</View>
        </View>
    </View>
  )
}

export default Taro.memo(NotFoundComponent)