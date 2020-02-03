import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function GoodsTypeGrids(props) {
    // const { title, goodsType } = props
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <Skeleton
            row={1}
            rowHeight={60}
            animate
            loading={loading}
        >
            <View className='goods-type-grids-conatiner'>
                <View className='goods-type-grids-title'>
                    <Text >苹果手机</Text>
                </View>
                <View className='goods-type-grid-container'>
                    <View className='goods-type-grid'>
                        <Image
                            src='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png' className='goods-type-grid-image'>
                        </Image>
                        <Text className='goods-type-grid-name'>iphone 11</Text>
                    </View>
                </View>
            </View>
        </Skeleton>
    )
}

export default Taro.memo(GoodsTypeGrids)