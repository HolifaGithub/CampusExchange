import Taro from '@tarojs/taro'
import Grid from '../../components/component-grid'
import { View } from '@tarojs/components'
import './index.scss'

interface GridDataObject{
    image:string,
    value:string,
    bgColor:string;
}

type GridDataArray = GridDataObject[]

function IndexGrid() {
    const data:GridDataArray= [
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/phone.png',
            value: '手机',
            bgColor:'#EAA432'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/computer.png',
            value: '电脑',
            bgColor:'#6BD3E3'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/book.png',
            value: '书籍',
            bgColor:'#A6B7F1'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/foot.png',
            value: '食品',
            bgColor:'#FB924C'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/fuzhuang.png',
            value: '服装',
            bgColor:'#BCE879'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/meizhuang.png',
            value: '美妆',
            bgColor:'#ED838F'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/study.png',
            value: '文具',
            bgColor:'#E6B185'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/sushe.png',
            value: '宿舍',
            bgColor:'#6739b6'
        }
    ]
    return (
        <View>
            <Grid  data={data}></Grid>
        </View>
    )
}

export default Taro.memo(IndexGrid)