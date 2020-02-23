import Taro from '@tarojs/taro'
import HeaderTitle from '../../components/component-header-title'
import WaterFall from '../../components/component-waterfall'
import getSystemInfo from '../../utils/getSystemInfo'
import { View, } from '@tarojs/components'
import './index.scss'

type datasType = {
    orderId:string;
    nameInput:string;
    newAndOldDegree:string;
    mode:string;
    objectOfPayment:string;
    payForMePrice:number;
    payForOtherPrice:number;
    wantExchangeGoods:string;
    topPicSrc:string;
    watchedPeople:number;
    nickName:string;
    avatarUrl:string;
}
interface Props {
    datas: datasType[]
}

function IndexWaterFall(props: Props) {
   const tarBarHeight=getSystemInfo().tabBarHeight+'px'
    return (
        <View className='index-waterfall-container'>
            <HeaderTitle></HeaderTitle>
            <WaterFall datas={props.datas} />
            <View className='block' style={{height:tarBarHeight}}></View>
        </View>
    )
}
IndexWaterFall.defaultProps = {
    datas: [{
        orderId:'',
        nameInput:'',
        newAndOldDegree:'',
        mode:'',
        objectOfPayment:'',
        payForMePrice:0,
        payForOtherPrice:0,
        wantExchangeGoods:'',
        topPicSrc:'',
        watchedPeople:0,
        nickName:'',
        avatarUrl:''
    },{
        orderId:'',
        nameInput:'',
        newAndOldDegree:'',
        mode:'',
        objectOfPayment:'',
        payForMePrice:0,
        payForOtherPrice:0,
        wantExchangeGoods:'',
        topPicSrc:'',
        watchedPeople:0,
        nickName:'',
        avatarUrl:''
    }
]
}
export default Taro.memo(IndexWaterFall)