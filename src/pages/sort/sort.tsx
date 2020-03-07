import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SortVerticalTabs from '../../floors/floor-sort-vertical-tabs'
import goodsTypeGridsDatas from '../../static-name/goods-sort'
import './sort.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Sort {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Sort extends Component {
  config: Config = {
    navigationBarTitleText: '校园换-分类页',
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps)
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (
      <View className='sort'>
        <SortVerticalTabs datas={goodsTypeGridsDatas}/>
      </View>
    )
  }
}

export default Sort as ComponentClass<PageOwnProps, PageState>
