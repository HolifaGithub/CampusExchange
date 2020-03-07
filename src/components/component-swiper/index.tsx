import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import { baseColor, indicatorColor } from '../../static-name/xiaoyuanhuan-color'
import './index.scss'

function CustomSwiper() {
  const interval = 4000
  const duration = 500
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={380}
      animate
      loading={loading}
    >
      <View className='swiper-container'>
        <Swiper
          className='swiper'
          indicatorColor={indicatorColor}
          indicatorActiveColor={baseColor}
          circular
          indicatorDots
          autoplay
          interval={interval}
          duration={duration}
          skipHiddenItemLayout
        >
          <SwiperItem className='swiper-item'>
            <Image
              className='swiper-img'
              src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner_ys/banner1.jpg'
              mode='widthFix'
            />
          </SwiperItem>
          <SwiperItem className='swiper-item'>
            <Image
              className='swiper-img'
              src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner_ys/banner2.jpg'
              mode='widthFix'
            />
          </SwiperItem>
          <SwiperItem className='swiper-item'>
            <Image
              className='swiper-img'
              src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/banner_ys/banner3.jpg'
              mode='widthFix'
            />
          </SwiperItem>
        </Swiper>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(CustomSwiper)