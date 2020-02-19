import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import './index.scss'

function Tag(props) {
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
      <View className='tag-container'>
            {props.title}
      </View>
    </Skeleton>
  )
}

export default Taro.memo(Tag)