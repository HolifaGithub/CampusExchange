import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View} from '@tarojs/components'
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
    navigationBarTitleText: '发布商品页',
    enablePullDownRefresh:false,
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle:'white'
  }
  render() {
    return (
      <View className='release-goods'>
        <ReleaseGoodsStepsContainer/>
      </View>
    )
  }
}

export default ReleaseGoods as ComponentClass<PageOwnProps, PageState>
