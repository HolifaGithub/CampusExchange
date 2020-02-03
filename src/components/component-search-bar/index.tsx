import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Input, Icon, Button } from '@tarojs/components'
// import { AtSearchBar } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import './index.scss'

function SearchBar() {
  // const initValue = ''
  const placeholder = '搜索一下'
  let [loading, setLoading] = useState(true)
  let [showSearchButton, setShowSearchButton] = useState(false)
  // let [value, setValue] = useState(initValue)
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
      <View className='container'>
        <View className='search-bar-container'>
          {/* <AtSearchBar
          value={value}
          placeholder={placeholder}
          onChange={() => { setValue(value) }}
        /> */}
          <Icon className='search-bar-icon' type='search' color='#C41A16' size='18px'></Icon>
          <Input placeholder={placeholder}
            className='search-bar'
            placeholderClass='input-placeholder'
            onFocus={() => { setShowSearchButton(true) }}
            onBlur={() => { setShowSearchButton(false) }}
            confirmType='search'
          ></Input>
        </View>
        {showSearchButton ? <Button size={"mini"} plain className='search-bar-button'>搜索</Button> : null}
      </View>
    </Skeleton>
  )
}

export default Taro.memo(SearchBar)