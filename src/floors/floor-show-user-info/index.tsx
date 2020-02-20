import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import ShowUserInfoContent from '../../components/component-show-user-info'
import './index.scss'

function ShowUserInfoContainer() {
    return (
        <View className='show-user-info-container'>
            <ShowUserInfoContent/>
        </View>
    )
}

export default Taro.memo(ShowUserInfoContainer)