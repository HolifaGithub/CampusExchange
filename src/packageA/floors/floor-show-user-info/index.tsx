import Taro from '@tarojs/taro'
import { View, } from '@tarojs/components'
import ShowUserInfoContent from '../../components/component-show-user-info'
import './index.scss'
interface Props{
    data:{}
}
function ShowUserInfoContainer(props:Props) {
    return (
        <View className='show-user-info-container'>
            <ShowUserInfoContent data={props.data}/>
        </View>
    )
}

export default Taro.memo(ShowUserInfoContainer)