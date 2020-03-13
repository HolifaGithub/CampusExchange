import Taro, { useState } from '@tarojs/taro'
import AtSearchBarComponent from '../../components/component-at-search-bar'
import { View, ScrollView } from '@tarojs/components'
import getSystemInfo from '../../utils/getSystemInfo'
import { AtTabs, AtTabsPane, AtNoticebar } from 'taro-ui'
import GoodsTypeGrids from '../../components/component-goods-type-grids'
import './index.scss'

interface Props {
    datas: {
        id: number;
        typeOne: string;
        typeOneDatas: {
            id: string;
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
            {/* <AtNoticebar icon='volume-plus' marquee>
                注意：分类栏仅展示常见类型或热门机型，如果没有想要的类型，请通过上方搜索栏或点击更多进行分类查找！
            </AtNoticebar> */}
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
                {/* {datas && datas.length > 0 ? datas.map((data, index) => {
                    const { typeOneDatas } = data
                    return (
                        <View key={data.id}>
                          { current>=index? <AtTabsPane tabDirection='vertical' current={current} index={index} >
                                <GoodsTypeGrids datas={typeOneDatas}></GoodsTypeGrids>
                            </AtTabsPane>:null}
                        </View>
                    )
                }) : null} */}
                {(current >=0) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={0}>
                    <GoodsTypeGrids datas={datas[0].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=1) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={1}>
                    <GoodsTypeGrids datas={datas[1].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=2) ? <AtTabsPane tabDirection='vertical' current={current} index={2}>
                    <GoodsTypeGrids datas={datas[2].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=3) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={3}>
                    <GoodsTypeGrids datas={datas[3].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=4) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={4}>
                    <GoodsTypeGrids datas={datas[4].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=5) ? <AtTabsPane tabDirection='vertical' current={current} index={5}>
                    <GoodsTypeGrids datas={datas[5].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=6) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={6}>
                    <GoodsTypeGrids datas={datas[6].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=7) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={7}>
                    <GoodsTypeGrids datas={datas[7].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=8) ? <AtTabsPane tabDirection='vertical' current={current} index={8}>
                    <GoodsTypeGrids datas={datas[8].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=9) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={9}>
                    <GoodsTypeGrids datas={datas[9].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=10) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={10}>
                    <GoodsTypeGrids datas={datas[10].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=11) ? <AtTabsPane tabDirection='vertical' current={current} index={11}>
                    <GoodsTypeGrids datas={datas[11].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=12) ? <AtTabsPane tabDirection='vertical' current={current} index={12}>
                    <GoodsTypeGrids datas={datas[12].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=13) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={13}>
                    <GoodsTypeGrids datas={datas[13].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
                {(current >=14) ? 
                <AtTabsPane tabDirection='vertical' current={current} index={14}>
                    <GoodsTypeGrids datas={datas[14].typeOneDatas}></GoodsTypeGrids>
                </AtTabsPane> : null}
            </AtTabs>
        </ScrollView>
    )
}
SortVerticalTabs.defaultProps = {
    datas: [
        {
            id: 0,
            typeOne: '',
            typeOneDatas: [{
                id: '',
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