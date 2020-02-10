import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

interface Props {
    datas: {
        typeTwo: string;
        trademark: string;
        typeTwoDatas: {
            typeThree: string;
            imageSrc: string;
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
                    const { typeTwo, trademark, typeTwoDatas } = data
                    return (
                        <View className='goods-type-grids-main-container' key={new Date().toString() + index}>
                            <View className='goods-type-grids-title-container'>
                                {trademark && trademark.length > 0 ? <Image
                                    src={trademark}
                                    className='goods-type-grids-title-trademark'>
                                </Image> : null}
                                <View className='goods-type-grids-title'>
                                    <Text >{typeTwo}</Text>
                                </View>
                            </View>
                            <View className='goods-type-grids-container'>
                                {typeTwoDatas && typeTwoDatas.length > 0 ? typeTwoDatas.map((data2, index2) => {
                                    const { typeThree, imageSrc } = data2
                                    return (
                                        <View className='goods-type-grid' key={new Date().toString() + index2}>
                                            <Image
                                                src={imageSrc}
                                                className='goods-type-grid-image'>
                                            </Image>
                                            <Text className='goods-type-grid-name'>{typeThree}</Text>
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
            typeTwo: '',
            trademark: '',
            typeTwoDatas: [
                {
                    typeThree: '',
                    imageSrc: '',
                }
            ]
        }
    ]
}
export default Taro.memo(GoodsTypeGrids)