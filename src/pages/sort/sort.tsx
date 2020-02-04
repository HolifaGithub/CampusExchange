import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import SortVerticalTabs from '../../floors/floor-sort-vertical-tabs'


import './sort.scss'

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

interface Sort {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Sort extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '校园换-分类页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const goodsTypeGridsDatas = [
      {
        type: '手机',
        typedatas: [
          {
            phoneTypeTitle: "iphone",
            trademark: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/iphone-trademark.png',
            datas: [
              {
                name: 'iphone11pro max',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/11pro%20max.png',
                jumpUrl:''
              },
              {
                name: 'iphone11pro',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/11pro.png',
                jumpUrl:''
              },
              {
                name: 'iphone11',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/11.png',
                jumpUrl:''
              }, {
                name: 'iphonexs max',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/xs%20max.png',
                jumpUrl:''
              },
              {
                name: 'iphonexs',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/xs.png',
                jumpUrl:''
              },
              {
                name: 'iphonexr',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/xr.png',
                jumpUrl:''
              },
              {
                name:'iphonex',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/x.png',
                jumpUrl:''
              },
              {
                name:'iphone8 plus',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/8%20plus.png',
                jumpUrl:''
              },
              {
                name:'iphone8',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/8.png',
                jumpUrl:''
              },
              {
                name: 'iphone7 plus',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/7plus.png',
                jumpUrl:''
              },
              {
                name: 'iphone7',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/7.png',
                jumpUrl:''
              },
              {
                name:'iphone6s plus',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/6splus.png',
                jumpUrl:''
              },
              {
                name:'iphone6s',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/6s.png',
                jumpUrl:''
              },
              {
                name:'iphone6',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/6.png',
                jumpUrl:''
              },
              {
                name:'iphonese',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/se.png',
                jumpUrl:''
              },
              {
                name:'iphone5s',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/iphone/5s.png',
                jumpUrl:''
              }
            ]
          },
          {
            phoneTypeTitle: "小米",
            trademark: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/xiaomi-trademark.png',
            datas: [
              {
                name: 'cc9 pro',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/cc9%20pro.png',
                jumpUrl:''
              },
              {
                name: 'k20 pro',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/k20%20pro.png',
                jumpUrl:''
              },
              {
                name: 'k20',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/k20.png',
                jumpUrl:''
              }, {
                name: 'k30',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/k30.png',
                jumpUrl:''
              },
              {
                name: 'mi8 se',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mi8%20se.png',
                jumpUrl:''
              },
              {
                name: 'mi8',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mi8.png',
                jumpUrl:''
              },
              {
                name:'mi9',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mi9.png',
                jumpUrl:''
              },
              {
                name:'mi9se',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mi9se.png',
                jumpUrl:''
              },
              {
                name:'mix2s',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mix2s.png',
                jumpUrl:''
              },
              {
                name: 'mix3',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/mix3.png',
                jumpUrl:''
              },
              {
                name: 'redmi 7A',
                imageSrc: 'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/redmi%207A.png',
                jumpUrl:''
              },
              {
                name:'redmi8 pro',
                imageSrc:'https://xiaoyuanhuan-1301020050.file.myqcloud.com/icon/goods-type-grids/phone/xiaomi/redmi8%20pro.png',
                jumpUrl:''
              }
            ]
          }
        ]
      }
    ]
    return (
      <View className='sort'>
        <SortVerticalTabs datas={goodsTypeGridsDatas}/>
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

export default Sort as ComponentClass<PageOwnProps, PageState>
