import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchFetchPageData } from '../../actions/fetchPageData'
import './index.scss'
import IndexHeader from '../../floors/floor-index-header'
import IndexGrid from '../../floors/floor-index-grid'
import IndexWaterFall from '../../floors/floor-index-waterfall'
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
  fetchPageData: {
    fetchPageDataStatus: string
    pageData: []
  }
}
   
type PageDispatchProps = {
  dispatchFetchPageData: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

type WaterFallDatasType = {
  imageSrc: string,
  avaterImageSrc: string,
  nickName: string,
  viewNumber: number,
  price: number,
  title:string
}
@connect(({ fetchPageData }) => ({
  fetchPageData
}), (dispatch) => ({
  dispatchFetchPageData() {
    dispatch(dispatchFetchPageData())
  }
}))
class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */

  componentWillMount() {
    this.props.dispatchFetchPageData();
  }

  // componentWillReceiveProps () {
  //   // console.log(this.props, nextProps)
  // }

  // componentWillUnmount () { }

  // componentDidShow () { }

  // componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '校园换-首页',
    backgroundColor:'#C41A16',
    enablePullDownRefresh:true,
  }
  render() {
    const waterFallDatas:WaterFallDatasType[] = [
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      },
      {
        imageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner1.png',
        avaterImageSrc:'http://www.xiaoyuanhuan.xyz:3000/img/banner2.png',
        nickName:'holifa',
        viewNumber:65375,
        price:3225.6,
        title:"iphonex 256 95新 要的快来"
      }
 
    ]
    return (
      <ScrollView 
      className='index'
      scrollY
      >
        {/* {this.props.fetchPageData.fetchPageDataStatus}
        {this.props.fetchPageData.pageData} */}
        <IndexHeader></IndexHeader>
        <IndexGrid></IndexGrid>
        <IndexWaterFall datas={waterFallDatas}></IndexWaterFall>
      </ScrollView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
