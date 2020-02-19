import Taro, { useState, useEffect } from '@tarojs/taro'
import { ScrollView, View, Text, Image } from '@tarojs/components'
import Skeleton from 'taro-skeleton'
import { AtNavBar, AtAvatar } from 'taro-ui'
import './index.scss'

function GooodsInfoContent() {
    let [loading, setLoading] = useState(true)
    let top=''
    Taro.getSystemInfo({
        success(res){
            top=(res.windowHeight-65)+'px'
        }
    })
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)

    }, [])
    return (
        <Skeleton
            row={1}
            rowHeight={60}
            animate
            loading={loading}
        >
            <View className='goods-info-content'>
                <AtNavBar
                    onClickLeftIcon={() => { Taro.navigateBack() }}
                    color='#000'
                    title='nameInputnameInputnameInputnameInputnameInput'
                    leftIconType='chevron-left'
                    leftText='返回'
                    border
                />
                <View className='header'>
                    <AtAvatar circle image='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/beauty-makeup/facial-care/fang-shai.png' size='large'></AtAvatar>
                    <View className='header-right'>
                        <View className='nick-name'>nickName</View>
                        <View>
                            <View className='sort'>分  类：手机/iphone/11pro</View>
                            <View className='school'>发布于：广州大学 </View>
                            <View className="time"> 时 间：2020.02.19 10:23</View>
                        </View>
                    </View>
                </View>
                <View className='body'>
                    <View className="count">
                        数量：1
                    </View>
                    <View className='price'>
                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-red.png'  className='icon'></Image>
                            <View>付给我：222.5元</View>
                        </View>

                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/price-green.png'  className='icon'></Image>
                            <View className='pay-for-you'>付给你：222.5元</View>
                        </View>
                        <View className='price-icon'>
                            <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/exchange-orange.png' className='icon'></Image>
                            <View className='want-exchange'>我想换：iphone 11 pro</View>
                        </View>
                    </View>
                    <View className='.at-article__p article'>
                        这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
                    </View>
                        <Image  className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                        <Image  className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                        <Image  className='goods-img' src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/goods/202021911241893323/wxab9d9c6867f0c70e.o6zAJsxLzm4nGXgtuAjQeopnDbbU.UoMjvhZGe7BD2ad707a8f0dc96cd9ae69cfb25f69779.png'></Image>
                </View>
                <View className='footer' style={{top:top}}>
                    <View className='button'>交易</View>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/collect.png' className='footer-icon'></Image>
                    <Image src='https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-info/chat-blue.png' className='footer-icon'></Image>
                </View>
            </View>
        </Skeleton>
    )
}

export default Taro.memo(GooodsInfoContent)