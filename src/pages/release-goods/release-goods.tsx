import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ReleaseGoodsStepsContainer from '../../floors/floor-release-goods-steps-container'
import './release-goods.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReleaseGoods {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ReleaseGoods extends Component {
  config: Config = {
    navigationBarTitleText: '校园换-发布商品页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='release-goods'>
        <ReleaseGoodsStepsContainer/>
      </View>
    )
  }
}

export default ReleaseGoods as ComponentClass<PageOwnProps, PageState>
