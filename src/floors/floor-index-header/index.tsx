import Taro from '@tarojs/taro'
import FunctionalHeader from '../../components/component-functional-header'
import SearchBar from '../../components/component-search-bar'
import CustomSwiper from '../../components/component-swiper'
import { View, } from '@tarojs/components'
import './index.scss'

function IndexHeader() {
    return (
        <View className='index-header-container'>
            <FunctionalHeader></FunctionalHeader>
            <SearchBar></SearchBar>
            <CustomSwiper></CustomSwiper>
        </View>
    )
}

export default Taro.memo(IndexHeader)