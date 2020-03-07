import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import ShowUserInfoContainer from '../../floors/floor-show-user-info'
import { server, port, protocol } from '../../../static-name/server'
import promiseApi from '../../../utils/promiseApi'
import { connect } from '@tarojs/redux'
import './show_user_info.scss'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ShowUserInfo {
  props: IProps;
}

@connect(() => ({

}), (dispatch) => ({

}))
class ShowUserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  config: Config = {
    navigationBarTitleText: '用户信息详情页'
  }
  componentWillMount() {
    // if (this.$preloadData) {
    //   this.$preloadData
    //     .then(res => {
    //       this.setState({ ...res })

    //     })
    // }
    const params=this.$router.preload!
    this.fetchData(params).then((res:any) => {
            this.setState({...res})
          })
  }
  // componentWillPreload(params) {
  //   return this.fetchData(params)
  // }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps)
  // }

  fetchData(params) {
    return new Promise((resolve, reject) => {
      let data;
      if (params.code) {
        data = { code: params.code }
      } else if (params.orderId) {
        data = { orderId: params.orderId }
      }
      promiseApi(Taro.request)({
        url: `${protocol}://${server}:${port}/getuserinfo`,
        method: 'GET',
        data: data
      }).then((res) => {
        if (res.statusCode === 200 && res.data.status === 'success') {
          resolve(res.data)
        }
      })
    })

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='show_user_info'>
        <ShowUserInfoContainer data={this.state} />
      </View>
    )
  }
}

export default ShowUserInfo as ComponentClass<PageOwnProps, PageState>
