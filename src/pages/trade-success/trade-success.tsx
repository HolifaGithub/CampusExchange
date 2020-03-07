import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import getSystemInfo from '../../utils/getSystemInfo'
import TradeSuccessContent from '../../components/component-trade-success-content'
import './trade-success.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TradeSuccess {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class TradeSuccess extends Component {
  config: Config = {
  }

  render() {
    const windowHeight = getSystemInfo().windowHeight + 'px'
    return (
      <View className='tarde-success' style={{ height: windowHeight }}>
        <TradeSuccessContent />
      </View>
    )
  }
}

export default TradeSuccess as ComponentClass<PageOwnProps, PageState>
