import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function UserInfo() {
  let [loading, setLoading] = useState(true)
  let [nickName,setNickName]=useState('登录/注册')
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
      <View className='user-info-container'>
        <View className='user-info-functional'>
          <Image src={`${CDNWebSite}/icon/user-info/setting.png`} className='setting-image'></Image>
          <Image src={`${CDNWebSite}/icon/user-info/qr-code.png`} className='qr-code-image'></Image>
        </View>
        <View className='user-info'>
            <Image src='http://www.xiaoyuanhuan.xyz:3000/img/banner2.png' className='avatar'></Image>
            <Text className='nick-name'>{nickName}</Text>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(UserInfo)