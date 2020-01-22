import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface GridDataObject{
    image:string,
    value:string
}

type GridDataArray = GridDataObject[]

interface Props{
    data:GridDataArray
}

function Grid(props:Props) {
    return (
        <View className='at-row at-row--wrap grid-container'>
            {
                props.data.map((item, index) => {
                    return (
                        <View className='at-col at-col-3 grid' key={index}>
                            <Image src={item.image} className='grid-image'></Image>
                            <View className='grid-value'>{item.value}</View>
                        </View>
                    )
                })
            }
        </View>

    )
}

export default Taro.memo(Grid)