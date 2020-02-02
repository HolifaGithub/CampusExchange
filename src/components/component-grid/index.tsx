import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import './index.scss'

interface GridDataObject {
    image: string,
    value: string
}

type GridDataArray = GridDataObject[]

interface Props {
    data: GridDataArray
}

function Grid(props: Props) {
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (

        <View className='at-row at-row--wrap grid-container'>
            {
                props.data ? props.data.map((item, index) => {
                    return (
                        <View className='at-col at-col-3 grid' key={new Date().toString()+index}>
                            <Skeleton
                                type='column'
                                row={1}
                                avatar
                                rowHeight={30}
                                animate
                                loading={loading}
                            >
                                <View className='grid-content'>
                                    <Image src={item.image} className='grid-image'></Image>
                                    <View className='grid-value'>{item.value}</View>
                                </View>
                            </Skeleton>
                        </View>

                    )
                }) : null
            }
        </View >



    )
}

export default Taro.memo(Grid)