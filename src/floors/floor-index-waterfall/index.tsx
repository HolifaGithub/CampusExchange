import Taro from '@tarojs/taro'
import HeaderTitle from '../../components/component-header-title'
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
            <HeaderTitle></HeaderTitle>
            <WaterFall datas={props.datas}/>
        </View>
    )
}

export default Taro.memo(IndexWaterFall)