import Taro from '@tarojs/taro'
import WaterFall from '../../components/component-waterfall'
import { View, } from '@tarojs/components'
import './index.scss'

type datasType = {
    imageSrc: string,
    avaterImageSrc: string,
    nickName: string,
    viewNumber: number,
    price: number,
    title:string
}
interface Props {
    datas: datasType[]
}

function IndexWaterFall(props: Props) {
    return (
        <View className='index-waterfall-container'>
            <WaterFall datas={props.datas}/>
        </View>
    )
}

export default Taro.memo(IndexWaterFall)