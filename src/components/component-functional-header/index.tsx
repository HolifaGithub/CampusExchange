import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtNoticebar, AtToast } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import promiseApi from '../../utils/promiseApi'
import { server, port, protocol } from '../../static-name/server'
import getDate from '../../utils/getDate'
import './index.scss'

interface Props {
  location: string;
}

function FunctionalHeader(props: Props) {
  let [loading, setLoading] = useState(true)
  let [tradeFail, setTradeFail] = useState(false)
  var timer
  useEffect(() => {
    timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
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
            <Text>{props.location && props.location.length > 0 ? props.location : '请授权获取位置'}</Text>
          </View>
          <View className='functional-header-calendar-container'>
            <Image src={'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/calendar-white.png'}
              className='functional-header-calendar-image'
            ></Image>
            <Text>{getDate()}</Text>
          </View>
          <View className='functional-header-qrcode-container' onClick={() => {
            promiseApi(Taro.scanCode)({
              onlyFromCamera: true,
              scanType: 'qrCode'
            }).then((res) => {
              const scanResult = res.result
              promiseApi(Taro.login)().then((loginResult) => {
                const code = loginResult.code
                if (code) {
                  promiseApi(Taro.request)({
                    url: `${protocol}://${server}:${port}/tradingscancode`,
                    method: 'POST',
                    data: {
                      code: code,
                      scanResult: scanResult
                    }
                  }).then((res) => {
                    if (res.statusCode === 200 && res.data.status === 'success') {
                      promiseApi(Taro.navigateTo)({
                        url: '/pages/trade-success/trade-success'
                      })
                    } else {
                      setTradeFail(true)
                    }
                  })
                }
              })
            })
          }}>
            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/functional-header/qrcode-white.png'
              className='functional-header-qrcode-image'
            ></Image>
          </View>
        </View>
        <AtToast isOpened={tradeFail} text="交易失败！" icon="close"></AtToast>
      </View>
    </Skeleton>
  )
}
FunctionalHeader.defaultProps = {
  location: '请授权获取位置'
}
export default Taro.memo(FunctionalHeader)