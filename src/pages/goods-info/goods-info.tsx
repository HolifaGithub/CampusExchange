import { ComponentClass } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { server, port, protocol } from '../../static-name/server'
import formatDate from '../../utils/formatDate'
import promiseApi from '../../utils/promiseApi'
import { connect } from '@tarojs/redux'
import GooodsInfoContainer from '../../floors/floor-goods-info-container'
import './goods-info.scss'

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
  constructor(props) {
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
    if (this.$preloadData) {
      this.$preloadData
        .then(res => {
          this.setState({ ...res })
        })
    }
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
            url: `${protocol}://${server}:${port}/getgoodsinfo`,
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
              // console.log(pics)
              const formatResult = formatDate(res.data.orderTime)
              let date = `${formatResult.year}/${formatResult.month}/${formatResult.day} ${formatResult.hour}:${formatResult.minute}:${formatResult.second}`
              fetchDataResult = { ...res.data, picsLocation: pics, orderTime: date }
              resolve(fetchDataResult)
            }
            if (res.statusCode === 400) {
              promiseApi(Taro.showToast)({
                title: '获取当前商品详情信息失败！',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      })
    })
  }
  render() {
    return (
      <View className='goods-info'>
        <GooodsInfoContainer data={this.state} />
      </View>
    )
  }
}
export default GoodsInfo as ComponentClass<PageOwnProps, PageState>
