import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.scss'

function SearchBar() {
  const initValue = ''
  const placeholder= '搜索'
  const [value, setValue] = useState(initValue)
  return (
    <View>
      <AtSearchBar
        value={value}
        placeholder={placeholder}
        onChange={() => { setValue(value) }}
      />
    </View>
  )
}

export default Taro.memo(SearchBar)