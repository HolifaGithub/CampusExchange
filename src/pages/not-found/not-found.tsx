import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NotFoundComponent from '../../components/componnent-not-found'
import './not-found.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface NotFound {
  props: IProps;
}

@connect(({  }) => ({
  
}), (dispatch) => ({

}))
class NotFound extends Component {
    config: Config = {
    navigationBarTitleText: '404 Not Found',
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='not-found'>
        <NotFoundComponent/>
      </View>
    )
  }
}

export default NotFound as ComponentClass<PageOwnProps, PageState>
