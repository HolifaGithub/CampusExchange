import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

interface Props {
    datas: {
        phoneTypeTitle: string;
        trademark: string;
        datas: {
            name: string;
            imageSrc: string;
            jumpUrl: string;
        }[];
    }[];
}

function GoodsTypeGrids(props: Props) {
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
            <View>
                {props.datas && props.datas.length > 0 ? props.datas.map((data, index) => {
                    const { phoneTypeTitle, trademark, datas } = data
                    return (
                        <View className='goods-type-grids-main-conatiner' key={new Date().toString()+index}>
                            <View className='goods-type-grids-title-container'>
                                <Image
                                    src={trademark}
                                    className='goods-type-grids-title-trademark'>
                                </Image>
                                <View className='goods-type-grids-title'>
                                    <Text >{phoneTypeTitle}</Text>
                                </View>
                            </View>
                            <View className='goods-type-grids-container'>
                                {datas && datas.length > 0 ? datas.map((data2, index2) => {
                                    const { name, imageSrc } = data2
                                    return (
                                        <View className='goods-type-grid' key={new Date().toString() + index2}>
                                            <Image
                                                src={imageSrc}
                                                className='goods-type-grid-image'>
                                            </Image>
                                            <Text className='goods-type-grid-name'>{name}</Text>
                                        </View>
                                    )
                                }) : null
                                }
                            </View>
                        </View>
                    )
                }) : null}
            </View>
        </Skeleton>
    )
}
GoodsTypeGrids.defaultProps = {
    datas: [
        {
            phoneTypeTitle: '',
            trademark: '',
            datas: [
                {
                    name: '',
                    imageSrc: '',
                    jumpUrl: ''
                }
            ]
        }
    ]
}
export default Taro.memo(GoodsTypeGrids)