import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
// import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'
import promiseApi from '../../utils/promiseApi'

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
    var timer
    useEffect(() => {
        timer=setTimeout(() => {
            setLoading(false)
        }, 500)
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    return (
        <View>
            {props.datas && props.datas.length > 0 ? props.datas.map((data, index) => {
                const { typeTwo, trademark, typeTwoDatas } = data
                return (
                    <View className='goods-type-grids-main-container' key={new Date().toString() + index}>
                        <Skeleton
                            row={1}
                            rowHeight={50}
                            animate
                            loading={loading}
                        >
                            <View className='goods-type-grids-title-container'>
                                {trademark && trademark.length > 0 ? <Image
                                    src={trademark}
                                    className='goods-type-grids-title-trademark'>
                                </Image> : null}
                                <View className='goods-type-grids-title'>
                                    <Text >{typeTwo}</Text>
                                </View>
                            </View>
                        </Skeleton>
                        <View className='goods-type-grids-container'>
                            {typeTwoDatas && typeTwoDatas.length > 0 ? typeTwoDatas.map((data2, index2) => {
                                const { typeThree, imageSrc } = data2
                                return (
                                    <Skeleton
                                        type='column'
                                        avatar
                                        avatar-size={3}
                                        row={1}
                                        row-width={'50%'}
                                        rowHeight={30}
                                        animate
                                        loading={loading}
                                        key={new Date().toString() + index2}
                                    >
                                        <View className='goods-type-grid' onClick={()=>{
                                            const searchStart='typeThree'
                                            promiseApi(Taro.navigateTo)({
                                                url:`/pages/search/search?value=${typeThree}&searchStart=${searchStart}`
                                            })
                                        }}>
                                            <Image
                                                src={imageSrc}
                                                className='goods-type-grid-image'
                                                lazyLoad
                                            >
                                            </Image>
                                            <Text className='goods-type-grid-name'>{typeThree}</Text>
                                        </View>
                                    </Skeleton>
                                )
                            }) : null
                            }
                        </View>
                    </View>
                )
            }) : null}
        </View>
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