import Taro from '@tarojs/taro'
import FunctionalHeader from '../../components/component-functional-header'
import SearchBar from '../../components/component-search-bar'
import CustomSwiper from '../../components/component-swiper'
import { View, } from '@tarojs/components'
import './index.scss'

interface Props{
    location:string;
}
function IndexHeader(props:Props) {
    return (
        <View className='index-header-container'>
            <FunctionalHeader location={props.location}></FunctionalHeader>
            <SearchBar></SearchBar>
            <CustomSwiper></CustomSwiper>
        </View>
    )
}

export default Taro.memo(IndexHeader)