import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import './index.scss'

interface GridDataObject {
    image: string;
    value: string;
    bgColor:string;
}

type GridDataArray = GridDataObject[]

interface Props {
    data: GridDataArray
}

function Grid(props: Props) {
    let [loading, setLoading] = useState(true)
    var timer
    useEffect(() => {
        timer=setTimeout(() => {
            setLoading(false)
        }, 1000)
        return ()=>{
            clearTimeout(timer)
        }
    }, [])
    return (

        <View className='at-row at-row--wrap grid-container'>
            {
                props.data ? props.data.map((item, index) => {
                    return (
                        <View className='at-col at-col-3 grid' key={new Date().toString() + index}>
                            <Skeleton
                                type='column'
                                row={1}
                                avatar
                                rowHeight={30}
                                animate
                                loading={loading}
                            >
                                <View className='grid-content' onClick={()=>{
                                    const searchStart = 'typeOne'
                                    Taro.navigateTo({
                                        url:`/pages/search/search?value=${item.value}&searchStart=${searchStart}`
                                    })
                                }}
                                hoverClass='hover'
                                >
                                    <View className='image-container' style={{backgroundColor:item.bgColor}}>
                                        <Image src={item.image} className='grid-image'></Image>
                                    </View>
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