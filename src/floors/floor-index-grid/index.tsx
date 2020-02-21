import Taro from '@tarojs/taro'
import Grid from '../../components/component-grid'
import { View } from '@tarojs/components'
import './index.scss'

interface GridDataObject{
    image:string,
    value:string
}

type GridDataArray = GridDataObject[]

function IndexGrid() {
    const data:GridDataArray= [
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/phone.png',
            value: '手机'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/computer.png',
            value: '电脑'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/book.png',
            value: '书籍'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/foot.png',
            value: '食品'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/fuzhuang.png',
            value: '服装'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/meizhuang.png',
            value: '美妆'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/study.png',
            value: '文具'
        },
        {
            image: 'https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/grid/sushe.png',
            value: '宿舍'
        }
    ]
    return (
        <View>
            <Grid  data={data}></Grid>
        </View>
    )
}

export default Taro.memo(IndexGrid)