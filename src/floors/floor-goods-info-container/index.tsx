import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import GooodsInfoContent from '../../components/component-goods-info-content'
import './index.scss'

function  GooodsInfoContainer() {
    return (
        <View className='goods-info-container'>
            <GooodsInfoContent/>
        </View>
    )
}

export default Taro.memo(GooodsInfoContainer)