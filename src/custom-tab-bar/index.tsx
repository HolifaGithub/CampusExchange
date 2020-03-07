import { ComponentClass } from 'react'
import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar, AtToast } from 'taro-ui'
import { CDNWebSite } from '../static-name/web-site'
import { baseColor, tabBarSelectedColor } from '../static-name/xiaoyuanhuan-color'
import {
  switchTabHome,
  switchTabSort,
  switchTabReleaseGoods,
  switchTabChat,
  switchTabPerson
} from '../actions/switchTabBar'
import promiseApi from '../utils/promiseApi'
import { needRelogin, notNeedRelogin } from '../actions/checkIsNeedRelogin'
import './index.scss'

type PageStateProps = {
  switchTarBar: {
    current: number
  },
  checkIsNeedRelogin: {
    isNeedRelogin: boolean;
  }
}

type PageDispatchProps = {
  switchTabHome: () => any;
  switchTabSort: () => any;
  switchTabReleaseGoods: () => any;
  switchTabChat: () => any;
  switchTabPerson: () => any;
  dispatchNeedRelogin: () => any;
  dispatchNotNeedRelogin: () => any;
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TabBar {
  props: IProps;
}


@connect(({ switchTarBar, checkIsNeedRelogin }) => ({
  switchTarBar,
  checkIsNeedRelogin
}), (dispatch) => ({
  switchTabHome() {
    dispatch(switchTabHome())
  }, switchTabSort() {
    dispatch(switchTabSort())
  }, switchTabReleaseGoods() {
    dispatch(switchTabReleaseGoods())
  }, switchTabChat() {
    dispatch(switchTabChat())
  }, switchTabPerson() {
    dispatch(switchTabPerson())
  },
  dispatchNeedRelogin() {
    dispatch(needRelogin())
  },
  dispatchNotNeedRelogin() {
    dispatch(notNeedRelogin())
  }
}))
class TabBar extends PureComponent {
  state = {
    isSessionEffective: false
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 200);
    promiseApi(Taro.checkSession)().then(() => {
      this.setState({ isSessionEffective: true })
    }).catch(() => {
      this.setState({ isSessionEffective: false })
    })
  }
 jumpTab(current){
  switch (current) {
    case 0: Taro.switchTab({
      url: '/pages/index/index',
      success: () => {
        this.props.switchTabHome()
      }
    })
      break
    case 1: Taro.switchTab({
      url: '/pages/sort/sort',
      success: () => {
        this.props.switchTabSort()
      }
    })
      break
    case 2: Taro.switchTab({
      url: '/pages/release-goods/release-goods',
      success: () => {
        this.props.switchTabReleaseGoods()
      }
    })
      break
    case 3: Taro.switchTab({
      url: '/pages/chat/chat',
      success: () => {
        this.props.switchTabChat()
      }
    })
      break
    case 4: Taro.switchTab({
      url: '/pages/person/person',
      success: () => {
        this.props.switchTabPerson()
      }
    })
      break
    default: Taro.switchTab({
      url: '/pages/index/index',
      success: () => {
        this.props.switchTabHome()
      }
    })
      break
  }
 }
  shouldComponentUpdate(nextProps,nextState){
    // console.log(nextProps.switchTarBar.current,this.props.switchTarBar.current)
    if(nextProps.switchTarBar.current!==this.props.switchTarBar.current){
      return true
    }else{
      return false
    }
  }
  render() {
    return (
        <View>
          <AtToast isOpened={this.props.checkIsNeedRelogin.isNeedRelogin || !this.state.isSessionEffective} text="您好,请先登录！即将跳转到登录页..." status='loading' duration={200}></AtToast>
          <AtTabBar
            tabList={[
              {
                title: '首页',
                image: `${CDNWebSite}/icon/tabbar_ys/home.png`,
                selectedImage: `${CDNWebSite}/icon/tabbar_ys/home-selected.png`,
              },
              {
                title: '分类',
                image: `${CDNWebSite}/icon/tabbar_ys/sort.png`,
                selectedImage: `${CDNWebSite}/icon/tabbar_ys/sort-selected.png`,
              },
              {
                title: '发布',
                image: `${CDNWebSite}/icon/tabbar_ys/release-goods.png`,
              },
              {
                title: '聊天',
                image: `${CDNWebSite}/icon/tabbar_ys/chat.png`,
                selectedImage: `${CDNWebSite}/icon/tabbar_ys/chat-selected.png`,
                text: '100',
                max: 99
              },
              {
                title: '个人中心',
                image: `${CDNWebSite}/icon/tabbar_ys/person.png`,
                selectedImage: `${CDNWebSite}/icon/tabbar_ys/person-selected.png`,
              }
            ]}
            onClick={(current) => {
              if (!this.props.checkIsNeedRelogin.isNeedRelogin && this.state.isSessionEffective) {
                  this.jumpTab(current)
              } else {
                promiseApi(Taro.checkSession)().then(() => {
                  this.setState({ isSessionEffective: true })
                  this.jumpTab(current)
                }).catch(() => {
                  this.setState({ isSessionEffective: false })
                  setTimeout(() => {
                    this.setState({ isSessionEffective: true })
                    Taro.switchTab({
                      url: '/pages/person/person',
                      success: () => {
                        this.props.switchTabPerson()
                      }
                    })
                  }, 200)
                })
              }
            }}
            current={this.props.switchTarBar.current}
            color='#FFFFFF'
            selectedColor={tabBarSelectedColor}
            backgroundColor={baseColor}
            iconSize={22}
            fontSize={13}
            fixed
            key={1}
          />
        </View>
    )
  }
}
export default TabBar as ComponentClass<PageOwnProps, PageState>