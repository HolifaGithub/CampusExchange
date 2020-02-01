import { ComponentClass } from 'react'
import Taro, { PureComponent } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtTabBar } from 'taro-ui'
import { CDNWebSite } from '../static-name/web-site'
import { baseColor, tabBarSelectedColor } from '../static-name/xiaoyuanhuan-color'
import {
  switchTabHome,
  switchTabSort,
  switchTabReleaseGoods,
  switchTabChat,
  switchTabPerson
} from '../actions/switchTabBar'
import './index.scss'

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
  switchTarBar: {
    current: number
  }
}

type PageDispatchProps = {
  switchTabHome: () => any,
  switchTabSort: () => any,
  switchTabReleaseGoods: () => any,
  switchTabChat: () => any,
  switchTabPerson: () => any,
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TabBar {
  props: IProps;
}


@connect(({ switchTarBar }) => ({
  switchTarBar
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
  }

}))
class TabBar extends PureComponent {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */

  // componentWillMount() {

  // }

  // componentWillReceiveProps () {
  //   // console.log(this.props, nextProps)
  // }

  // componentWillUnmount () { }

  // componentDidShow () { }

  // componentDidHide () { }

  render() {

    return (
      <AtTabBar
        tabList={[
          {
            title: '首页',
            image: `${CDNWebSite}/icon/tabbar/home.png`,
            selectedImage: `${CDNWebSite}/icon/tabbar/home-selected.png`,
          },
          {
            title: '分类',
            image: `${CDNWebSite}/icon/tabbar/sort.png`,
            selectedImage: `${CDNWebSite}/icon/tabbar/sort-selected.png`,
          },
          {
            title: '发布',
            image: `${CDNWebSite}/icon/tabbar/release-goods.png`,
          },
          {
            title: '聊天',
            image: `${CDNWebSite}/icon/tabbar/chat.png`,
            selectedImage: `${CDNWebSite}/icon/tabbar/chat-selected.png`,
            text: '100',
            max: 99
          },
          {
            title: '个人中心',
            image: `${CDNWebSite}/icon/tabbar/person.png`,
            selectedImage: `${CDNWebSite}/icon/tabbar/person-selected.png`,
          }
        ]}
        onClick={(current) => {
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
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default TabBar as ComponentClass<PageOwnProps, PageState>