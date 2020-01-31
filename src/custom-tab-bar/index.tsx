import Taro, { useState, useEffect } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { CDNWebSite } from '../static-name/web-site'
import { baseColor, tabBarSelectedColor } from '../static-name/xiaoyuanhuan-color'
import configStore from '../store'
import {
  switchTabHome,
  switchTabSort,
  switchTabReleaseGoods,
  switchTabChat,
  switchTabPerson
} from '../actions/switchTabBar'
import './index.scss'

function Tabbar() {
  const store = configStore()
  const { getState, dispatch } = store
  const storeCurrent = getState().switchTarbar.current
  console.log('storeCurrent',storeCurrent)
  const [current, setCurrent] = useState(0)
  console.log("current", current)
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
            success() {
              dispatch(switchTabHome())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
          case 1: Taro.switchTab({
            url: '/pages/home/home',
            success() {
              dispatch(switchTabSort())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
          case 2: Taro.switchTab({
            url: '/pages/home/home',
            success() {
              dispatch(switchTabReleaseGoods())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
          case 3: Taro.switchTab({
            url: '/pages/home/home',
            success() {
              dispatch(switchTabChat())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
          case 4: Taro.switchTab({
            url: '/pages/home/home',
            success() {
              dispatch(switchTabPerson())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
          default: Taro.switchTab({
            url: '/pages/index/index',
            success() {
              dispatch(switchTabHome())
              setCurrent(getState().switchTarbar.current)
            }
          })
            break
        }

      }}
      current={current}
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

export default Taro.memo(Tabbar)