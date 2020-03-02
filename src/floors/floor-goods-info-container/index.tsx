import Taro,{ useEffect} from '@tarojs/taro'
import { View, } from '@tarojs/components'
import GooodsInfoContent from '../../components/component-goods-info-content'
import './index.scss'

interface Props{
    data:{}
}
function  GooodsInfoContainer(props:Props) { 
    return (
        <View className='goods-info-container'>
            <GooodsInfoContent data={props.data}/>
        </View>
    )
}
GooodsInfoContainer.defaultProps = {
    data: {
        status:'',
        orderId: '',
        orderTime: '',
        orderStatus: '',
        typeOne: '',
        typeTwo: '',
        typeThree: '',
        nameInput: '',
        goodsNumber: 1,
        newAndOldDegree: '',
        mode: '',
        objectOfPayment: '',
        payForMePrice: 0,
        payForOtherPrice: 0,
        wantExchangeGoods: '',
        describe: '',
        picsLocation: '',
        nickName: '',
        avatarUrl: '',
        school: '',
        isCare:false
    }
}
export default Taro.memo(GooodsInfoContainer)