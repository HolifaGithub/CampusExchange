import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import  ReleaseGoodsSteps from '../../components/component-release-goods-steps'
import './index.scss'

function ReleaseGoodsStepsContainer() {
    return (
        <View className='release-goods-steps-container'>
            <ReleaseGoodsSteps></ReleaseGoodsSteps>
        </View>
    )
}

export default Taro.memo(ReleaseGoodsStepsContainer)