import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import getDate from '../../utils/getDate'
import './index.scss'

function onClick (){
  Taro.scanCode({
    success (res) {
      console.log(res)
    }
  })
}

function FunctionalHeader() {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={50}
      animate
      loading={loading}
    >
      <View className='functional-header-container'>
        <AtNoticebar icon='volume-plus' marquee>
          校园换是一款大学生本校二手交易小程序，具有交易方便快捷，安全可靠，种类丰富的特点，欢迎大家使用！谢谢！
        </AtNoticebar>
        <View className='functional-header-content-container'>
          <View className='functional-header-calendar-container'>
            <Image src={'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/calendar.png'}
              className='functional-header-calendar-image'
            ></Image>
            <Text>{getDate()}</Text>
            </View>
            <View className='functional-header-qrcode-container' onClick={onClick}>
              <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/qr-code.png'
              className='functional-header-qrcode-image'
              ></Image>
              <Text>扫码</Text>
            </View>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(FunctionalHeader)