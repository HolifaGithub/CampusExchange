import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import { AtAvatar } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import './index.scss'

function ShowUserInfoContent() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='show-user-info-content'>
        <View className='header'>
          <AtAvatar circle image={'http://www.xiaoyuanhuan.xyz:3001/img/banner3.png'} size='large'></AtAvatar>
          <View className='header-middle'>
            <View className='nick-name'>Holifa</View>
            <View className='sex'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/sex.png' className='icon'></Image>
              <View>性别：男</View>
            </View>
            <View className='birthday'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/birthday.png' className='icon'></Image>
              <View>生日：1998年08月23日</View>
            </View>
          </View>
          <View className='header-right'>
            <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/security.png' className='icon'></Image>
            <View>广州大学</View>

          </View>
        </View>
        <View className='body'>
          <View className='true-name row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/name.png' className='icon'></Image>
              <View>姓名：</View>
            </View>
            <View className='value'>黄沥锋</View>

          </View>
          <View className='id-card row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/id-card.png' className='icon'></Image>
              <View>身份证：</View>
            </View>
            <View className='value'>441427199808231713</View>

          </View>
          <View className='phone row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/phone.png' className='icon'></Image>
              <View>手机:</View>
            </View>
            <View className='value'>13178804698</View>
          </View>
          <View className='address row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/location.png' className='icon'></Image>
              <View>省市区:</View>
            </View>
            <View className='value'>广东省/广州市/番禺区</View>
          </View>
          <View className='collage row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/%E5%AD%A6%E9%99%A2.png' className='icon'></Image>
              <View>学院:</View>
            </View>
            <View className='value'>计算机科学与网络工程学院</View>
          </View>
          <View className='class row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/%E7%8F%AD%E7%BA%A7.png' className='icon'></Image>
              <View>班级:</View>
            </View>
            <View className='value'>网络工程161班</View>
          </View>
          <View className='address row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/detail_address.png' className='icon'></Image>
              <View>详细地址：</View>
            </View>
            <View className='value'> B15-408</View>
          </View>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(ShowUserInfoContent)