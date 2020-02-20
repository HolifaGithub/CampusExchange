import { ComponentClass } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { server, port } from '../../static-name/server'
import formatDate from '../../utils/formatDate'
import promiseApi from '../../utils/promiseApi'
import { connect } from '@tarojs/redux'
import GooodsInfoContainer from '../../floors/floor-goods-info-container'
import './goods-info.scss'

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

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface GoodsInfo {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class GoodsInfo extends PureComponent {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  config: Config = {
    navigationBarTitleText: '商品详情',
    enablePullDownRefresh: false,
  }
  componentWillMount() {
    this.$preloadData
      .then(res => {
        this.setState({ ...res })
      })
  }
  componentWillPreload(params) {
    return this.fetchData(params.orderId)
  }
  fetchData(orderId) {
    let fetchDataResult = {}
    return new Promise((resolve, reject) => {
      promiseApi(Taro.login)().then((loginResult) => {
        const code = loginResult.code
        if (code) {
          promiseApi(Taro.request)({
            url: `http://${server}:${port}/getgoodsinfo`,
            method: 'GET',
            data: {
              code: code,
              orderId: orderId
            }
          }).then((res) => {
            if (res.statusCode === 200 && res.data.status === 'success') {
              let pics = res.data.picsLocation
              pics = pics.split(";")
              if (pics[pics.length - 1] === '') {
                pics.pop()
              }
              for (let i = 0; i < pics.length; i++) {
                if (pics[i] !== '') {
                  pics[i] = `https://${pics[i]}`
                } else {
                  pics.splice(i, 1)
                }
              }
              console.log(pics)
              const formatResult = formatDate(res.data.orderTime)
              let date = `${formatResult.year}/${formatResult.month}/${formatResult.day} ${formatResult.hour}:${formatResult.minute}:${formatResult.second}`
              fetchDataResult = { ...res.data, picsLocation: pics, orderTime: date }
              resolve(fetchDataResult)
            }
          })
        }
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='goods-info'>
        <GooodsInfoContainer data={this.state} />
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

export default GoodsInfo as ComponentClass<PageOwnProps, PageState>
