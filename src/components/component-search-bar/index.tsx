import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import './index.scss'

function SearchBar() {
  const initValue = ''
  const placeholder = '搜索'
  let [loading, setLoading] = useState(true)
  let [value, setValue] = useState(initValue)
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
      <View>
        <AtSearchBar
          value={value}
          placeholder={placeholder}
          onChange={() => { setValue(value) }}
        />
      </View>
    </Skeleton>
  )
}

export default Taro.memo(SearchBar)