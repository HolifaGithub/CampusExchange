import Taro from '@tarojs/taro'
import UserInfo from '../../components/component-user-info'
import Balance from '../../components/component-balance'
import OrderInfo from '../../components/component-order-info'
import GetInfoBars from '../../components/component-getinfo-bars'
import { View, } from '@tarojs/components'
import './index.scss'

function PersonUserInfo() {
    return (
        <View className='person-user-info-container'>
            <UserInfo></UserInfo>
            <Balance></Balance>
            <OrderInfo></OrderInfo>
            <GetInfoBars></GetInfoBars>
        </View>
    )
}

export default Taro.memo(PersonUserInfo)