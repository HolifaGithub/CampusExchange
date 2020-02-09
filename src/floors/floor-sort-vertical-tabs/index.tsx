import Taro, { useState } from '@tarojs/taro'
import SearchBar from '../../components/component-search-bar'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane,AtNoticebar } from 'taro-ui'
import GoodsTypeGrids from '../../components/component-goods-type-grids'
import './index.scss'

interface Props {
    datas: {
        type: string;
        typedatas: {
            phoneTypeTitle: string;
            trademark: string;
            datas: {
                name: string;
                imageSrc: string;
                jumpUrl: string;
            }[];
        }[];
    }[]
}

function SortVerticalTabs(props: Props) {
    const tabHeight = '2550px';
    const [current, setCurrent] = useState(0)
    const { datas } = props
    const { type, typedatas } = datas[0]
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
                tabList={[
                    { title: type },
                    { title: '电脑' },
                    { title: '书籍' },
                    { title: '食品' },
                    { title: '数码家电' },
                    { title: '运动户外' },
                    { title: '服饰鞋靴' },
                    { title: '美妆个护' },
                    { title: '运动户外' },
                    { title: '箱包礼品' },
                    { title: '宿舍用品' },
                    { title: '学习文具' },
                    { title: '医疗药品' },
                    { title: '虚拟物品' },
                ]}
                onClick={(current) => { setCurrent(current) }}>
                <AtTabsPane tabDirection='vertical' current={current} index={0}>
                    <View style='font-size:18px;text-align:start;height:400px;'>
                        <GoodsTypeGrids datas={typedatas}></GoodsTypeGrids>
                    </View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={1}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={2}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={3}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={4}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页五的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={5}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页六的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={6}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页七的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={7}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页八的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={8}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页九的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={9}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页十的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={10}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页十一的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current} index={11}>
                    <View style='font-size:18px;text-align:center;height:200px;'>标签页十二的内容</View>
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}
SortVerticalTabs.defaultProps = {
    datas: [
        {
            type: '',
            typedatas: [{
                phoneTypeTitle: '',
                trademark: '',
                datas: [{
                    name: '',
                    imageSrc: '',
                    jumpUrl: ''
                }]
            }]
        }
    ]
}

export default Taro.memo(SortVerticalTabs)