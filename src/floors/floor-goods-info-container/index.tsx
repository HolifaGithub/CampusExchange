import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import GooodsInfoContent from '../../components/component-goods-info-content'
import './index.scss'

interface Props{
    orderId:string
}
function  GooodsInfoContainer(props:Props) {
    return (
        <View className='goods-info-container'>
            <GooodsInfoContent orderId={props.orderId}/>
        </View>
    )
}

export default Taro.memo(GooodsInfoContainer)