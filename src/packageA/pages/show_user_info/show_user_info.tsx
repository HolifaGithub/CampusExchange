import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import ShowUserInfoContainer from '../../floors/floor-show-user-info'
import { server, port, protocol } from '../../../static-name/server'
import promiseApi from '../../../utils/promiseApi'
import { connect } from '@tarojs/redux'
import './show_user_info.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

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

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
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

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default ShowUserInfo as ComponentClass<PageOwnProps, PageState>
