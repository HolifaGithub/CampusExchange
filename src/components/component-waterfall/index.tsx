import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

type datasType = {
    imageSrc: string,
    avaterImageSrc: string,
    nickName: string,
    viewNumber: number,
    price: number,
    title: string
}

interface Props {
    datas: datasType[]
}

function Waterfall(props: Props) {
    const { datas } = props;
    return (
        <View className='water-fall-container'>
            {(datas && datas.length > 0) ? datas.map((data, index) => {
                const { imageSrc, avaterImageSrc, nickName, viewNumber, price, title } = data
                return (
                    <View className='water-fall-item' key={new Date().toString() + index}>
                        <Image className='water-fall-image' src={imageSrc}></Image>
                        <View className='water-fall-title'><Text>{title}</Text></View>
                        <View className='water-fall-content-container'>
                            <View className='water-fall-price'><Text>&yen;{price}</Text></View>
                            <Image className='water-fall-avater-image' src={avaterImageSrc}></Image>
                            <View className='water-fall-nick-name'><Text>{nickName+nickName+nickName}</Text>
                            </View>
                            <View className='water-fall-view-container'>
                                <Image src={imageSrc} className='water-fall-view-image'></Image>
                                <View className='water-falll-view-number'><Text>{viewNumber}</Text></View>
                            </View>
                        </View>
                    </View>
                )
            }) : null}
        </View >
    )
}

export default Taro.memo(Waterfall)