import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import { server, port, protocol } from '../../static-name/server'
import TradingContent from '../../components/component-trading'
import './trading.scss'

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Trading {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Trading extends Component {
  config: Config = {
    navigationBarTitleText: '交易页',
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: false
  }
  
  state={
    datas: {
      avatarUrl: '',
      nickName: '',
      typeOne: '',
      typeTwo: '',
      typeThree: '',
      orderTime: '',
      nameInput: '',
      goodsNumber: 0,
      newAndOldDegree: '',
      mode: '',
      objectOfPayment: '',
      payForMePrice: 0,
      payForOtherPrice: 0,
      wantExchangeGoods: '',
      topPic: '',
      orderId: '',
      school: '',
      salederPhone:'',
      salederAddress:'',
      buierPhone:'',
      buierAddress:'',
      buierAvatarUrl:'',
      orderCode:'',
      buierNickName:''
  }
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props, nextProps)
  // }
  componentWillMount() {
    this.$preloadData
      .then(res => {
        // console.log('res: ', res)
        this.setState({datas:res})
      })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  componentWillPreload(params) {
    return new Promise((resolve, reject) => {
      const orderId = params.orderId
      if (orderId) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/trading`,
          method: 'GET',
          data: {
            orderId: orderId
          }
        }).then((res) => {
          if (res.statusCode = 200 && res.data.status === 'success') {
            const datas = Object.assign({}, params, res.data)
            resolve(datas)
          } else {
            reject()
          }
        })
      }
    })
  }
  render() {
    return (
      <View className='trading'>
        <TradingContent datas={this.state.datas}/>
      </View>
    )
  }
}

export default Trading as ComponentClass<PageOwnProps, PageState>
