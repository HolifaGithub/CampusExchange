import Taro, { useState } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { CDNWebSite } from '../static-name/web-site'
import { baseColor, tabBarSelectedColor } from '../static-name/xiaoyuanhuan-color'
import './index.scss'

function Index() {
  const [current, setCurrent] = useState(0);
  return (
      <AtTabBar
        tabList={[
          {
            title: '首页',
            image: `${CDNWebSite}/icon/home.png`,
            selectedImage: `${CDNWebSite}/icon/home-selected.png`,
          },
          {
            title: '分类',
            image: `${CDNWebSite}/icon/sort.png`,
            selectedImage: `${CDNWebSite}/icon/sort-selected.png`,
          },
          {
            title: '发布',
            image: `${CDNWebSite}/icon/release-goods.png`,
          },
          {
            title: '聊天',
            image: `${CDNWebSite}/icon/chat.png`,
            selectedImage: `${CDNWebSite}/icon/chat-selected.png`,
            text: '100',
            max: 99
          },
          {
            title: '个人中心',
            image: `${CDNWebSite}/icon/person.png`,
            selectedImage: `${CDNWebSite}/icon/person-selected.png`,
          }
        ]}
        onClick={(value) => { setCurrent(value) }}
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

export default Index 