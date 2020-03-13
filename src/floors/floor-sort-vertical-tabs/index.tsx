import Taro, { useState } from '@tarojs/taro'
import AtSearchBarComponent from '../../components/component-at-search-bar'
import { View, ScrollView } from '@tarojs/components'
import getSystemInfo from '../../utils/getSystemInfo'
import { AtTabs, AtTabsPane, AtNoticebar } from 'taro-ui'
import GoodsTypeGrids from '../../components/component-goods-type-grids'
import './index.scss'

interface Props {
    datas: {
        typeOne: string;
        typeOneDatas: {
            id:string;
            typeTwo: string;
            trademark: string;
            typeTwoDatas: {
                typeThree: string;
                imageSrc: string;
            }[];
        }[];
    }[]
}

interface TabList {
    title: string
}
function SortVerticalTabs(props: Props) {
    // const tabHeight = '1450px';
    const [current, setCurrent] = useState(0)
    const { datas } = props
    const tabList: TabList[] = []
    let windowHeight
    for (let data of datas) {
        tabList.push({ title: data.typeOne })
    }
    windowHeight = (getSystemInfo().windowHeight - getSystemInfo().tabBarHeight) + 'px'
    return (
        <ScrollView className='sort-vertical-tabs-container' enableFlex scrollY style={{ height: windowHeight }}>
            <AtSearchBarComponent></AtSearchBarComponent>
            <AtNoticebar icon='volume-plus' marquee>
                注意：分类栏仅展示常见类型或热门机型，如果没有想要的类型，请通过上方搜索栏或点击更多进行分类查找！
            </AtNoticebar>
            <View className='blank'></View>
            <AtTabs
                current={current}
                scroll
                height={windowHeight}
                tabDirection='vertical'
                tabList={tabList}
                onClick={(current) => {
                    setCurrent(current)
                    Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
                }}>
                {datas && datas.length > 0 ? datas.map((data, index) => {
                    const { typeOneDatas } = data
                    return (
                        <AtTabsPane tabDirection='vertical' current={current} index={index} key={index}>
                            <GoodsTypeGrids datas={typeOneDatas}></GoodsTypeGrids>
                        </AtTabsPane>
                    )
                }):null} 
            </AtTabs>
        </ScrollView>
    )
}
SortVerticalTabs.defaultProps = {
    datas: [
        {
            typeOne: '',
            typeOneDatas: [{
                id:'',
                typeTwo: '',
                trademark: '',
                typeTwoDatas: [{
                    typeThree: '',
                    imageSrc: '',
                }]
            }]
        }
    ]
}

export default Taro.memo(SortVerticalTabs)