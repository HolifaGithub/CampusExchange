import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import getLocation from '../../utils/getLocation'
import Skeleton from 'taro-skeleton'
import getDate from '../../utils/getDate'
import isNullOrUndefined from '../../utils/isNullOrUndefined'
import isStringLengthEqualZero from '../../utils/isStringLengthEqualZero'
import './index.scss'

interface LocationResult {
  status: number,
  message: string,
  result: any,
  request_id: string
}
function onClick() {
  Taro.scanCode({
    success(res) {
      console.log(res)
    }
  })
}

function FunctionalHeader() {
  let [loading, setLoading] = useState(true)
  let [location, setLocation] = useState('请授权获取位置')
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    getLocation().then((res: LocationResult) => {
      if (!isNullOrUndefined(res.result.address_component)) {
        const address_component = res.result.address_component
        if (!isNullOrUndefined(address_component)) {
          const province = address_component.province
          const city = address_component.city
          const district = address_component.district
          if (!isStringLengthEqualZero(province) || !isStringLengthEqualZero(city) || !isStringLengthEqualZero(district)) {
            setLocation(`${province}${city}${district}`)
          }
        }
      }
    }).catch(()=>{
      setLocation('无法获取当前位置')
    })
  }, [])
  return (
    <Skeleton
      row={2}
      rowHeight={50}
      animate
      loading={loading}
    >
      <View className='functional-header-container'>
        <AtNoticebar icon='volume-plus' marquee>
          校园换是一款大学生本校二手交易小程序，具有交易方便快捷，安全可靠，种类丰富的特点，欢迎大家使用！谢谢！
        </AtNoticebar>
        <View className='functional-header-content-container'>
          <View className='functional-header-location-container'>
            <Image src={'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/location-white.png'}
              className='functional-header-location-image'
            ></Image>
            <Text>{location}</Text>
          </View>
          <View className='functional-header-calendar-container'>
            <Image src={'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/calendar-white.png'}
              className='functional-header-calendar-image'
            ></Image>
            <Text>{getDate()}</Text>
          </View>
          <View className='functional-header-qrcode-container' onClick={onClick}>
            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/qrcode-white.png'
              className='functional-header-qrcode-image'
            ></Image>
          </View>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(FunctionalHeader)