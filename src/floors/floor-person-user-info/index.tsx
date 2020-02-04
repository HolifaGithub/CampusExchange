import Taro from '@tarojs/taro'
import UserInfo from '../../components/component-user-info'
import Balance from '../../components/component-balance'
import { View, } from '@tarojs/components'
import './index.scss'

function PersonUserInfo() {
    return (
        <View className='person-user-info-container'>
            <UserInfo></UserInfo>
            <Balance></Balance>
        </View>
    )
}

export default Taro.memo(PersonUserInfo)