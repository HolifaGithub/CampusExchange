import Taro, { useState } from '@tarojs/taro'
import SearchBar from '../../components/component-search-bar'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtNoticebar } from 'taro-ui'
import GoodsTypeGrids from '../../components/component-goods-type-grids'
import './index.scss'

interface Props {
    datas: {
        typeOne: string;
        typeOneDatas: {
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
    const tabHeight = '1650px';
    const [current, setCurrent] = useState(0)
    const { datas } = props
    const tabList: TabList[] = []
    for (let data of datas) {
        tabList.push({ title: data.typeOne })
    }
    return (
        <View className='sort-vertical-tabs-container'>
            <SearchBar></SearchBar>
            <AtNoticebar icon='volume-plus' marquee>
                注意：分类栏仅展示常见类型或热门机型，如果没有想要的类型，请通过上方搜索栏或点击更多进行分类查找！
            </AtNoticebar>
            <View className='blank'></View>
            <AtTabs
                current={current}
                scroll
                height={tabHeight}
                tabDirection='vertical'
                tabList={tabList}
                onClick={(current) => { setCurrent(current) }}>
                {datas && datas.length > 0 ? datas.map((data, index) => {
                    const { typeOneDatas } = data
                    return (
                        <AtTabsPane tabDirection='vertical' current={current} index={index} key={new Date().toString()+index}>
                            <View style='font-size:18px;text-align:start;height:400px;'>
                                <GoodsTypeGrids datas={typeOneDatas}></GoodsTypeGrids>
                            </View>
                        </AtTabsPane>
                    )
                }):null}
            </AtTabs>
        </View>
    )
}
SortVerticalTabs.defaultProps = {
    datas: [
        {
            typeOne: '',
            typeOneDatas: [{
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