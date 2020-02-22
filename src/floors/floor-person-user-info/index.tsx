import Taro from '@tarojs/taro'
import UserInfo from '../../components/component-user-info'
import Balance from '../../components/component-balance'
import OrderInfo from '../../components/component-order-info'
import GetInfoBars from '../../components/component-getinfo-bars'
import { View, } from '@tarojs/components'
import './index.scss'

function PersonUserInfo(props) {
    return (
        <View className='person-user-info-container'>
            <UserInfo isSessionEffective={props.isSessionEffective.isSessionEffective}></UserInfo>
            <Balance isSessionEffective={props.isSessionEffective.isSessionEffective}></Balance>
            <OrderInfo isSessionEffective={props.isSessionEffective.isSessionEffective}></OrderInfo>
            <GetInfoBars isSessionEffective={props.isSessionEffective.isSessionEffective}></GetInfoBars>
        </View>
    )
}
PersonUserInfo.defaultProps={
    isSessionEffective:{
        isSessionEffective:false
    }
}
export default Taro.memo(PersonUserInfo)