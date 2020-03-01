import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import UserRegister from '../../components/component-user-register'
import './index.scss'

function RegisterContent() {
    return (
        <View className='register-content-container'>
            <UserRegister></UserRegister>
        </View>
    )
}

export default Taro.memo(RegisterContent)