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
    title: string
}
interface Props {
    datas: datasType[]
}

function IndexWaterFall(props: Props) {
    console.log(props.datas);
    return (
        <View className='index-waterfall-container'>
            <HeaderTitle></HeaderTitle>
            <WaterFall datas={props.datas} />
        </View>
    )
}
IndexWaterFall.defaultProps = {
    datas: [{
        imageSrc: '',
        avaterImageSrc: '',
        nickName: '',
        viewNumber: 0,
        price: 0,
        title: ''
    },{
        imageSrc: '',
        avaterImageSrc: '',
        nickName: '',
        viewNumber: 0,
        price: 0,
        title: ''
    }
]
}
export default Taro.memo(IndexWaterFall)