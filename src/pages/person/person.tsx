import { ComponentClass } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import promiseApi from '../../utils/promiseApi'
import PersonUserInfo from '../../floors/floor-person-user-info'
// import { connect } from '@tarojs/redux'
import './person.scss'


type PageStateProps = {
  checkIsNeedRelogin: {
    isNeedRelogin: boolean;
  }
}

type PageDispatchProps = {}


type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Person {
  props: IProps;
}

@connect(({ checkIsNeedRelogin }) => ({
  checkIsNeedRelogin
}), (dispatch) => ({

}))
class Person extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isSessionEffective: false
    }
  }
  config: Config = {
    navigationBarTitleText: '个人中心',
    enablePullDownRefresh: false,
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white',
    backgroundColor: '#eeeeee'
  }

  // componentWillMount() {
  //   // this.checkSessionEffective().then((res: boolean) => {
  //   //   this.setState({ isSessionEffective: res })
  //   // })
  // }
  componentWillReceiveProps() {

  }

  componentWillUpdate() {
    var that = this;
    promiseApi(Taro.checkSession)().then(() => {
      that.setState({ isSessionEffective: true })
    }).catch(() => {
      that.setState({ isSessionEffective: false })
    })
  }
  componentWillUnmount() { }

  componentDidShow() { 
    // var that = this;
    // promiseApi(Taro.checkSession)().then(() => {
    //   that.setState({ isSessionEffective: true })
    // }).catch(() => {
    //   that.setState({ isSessionEffective: false })
    // })
  }

  componentDidHide() { }

  render() {
    return (
      <View className='person'>
        <PersonUserInfo isSessionEffective={this.state} />
      </View>
    )
  }
}

export default Person as ComponentClass<PageOwnProps, PageState>
