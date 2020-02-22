import { ComponentClass } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchFetchPageData } from '../../actions/fetchPageData'
import './index.scss'
import IndexHeader from '../../floors/floor-index-header'
import IndexGrid from '../../floors/floor-index-grid'
import IndexWaterFall from '../../floors/floor-index-waterfall'
import { AtToast } from "taro-ui"
import getLocation from '../../utils/getLocation'
import isNullOrUndefined from '../../utils/isNullOrUndefined'
import isStringLengthEqualZero from '../../utils/isStringLengthEqualZero'
import { switchTabPerson } from '../../actions/switchTabBar'
import { authorized, notAuthorized } from '../../actions/checkIsAuthorized'
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
    fetchPageDataStatus: string;
    pageData: [];
  },
  switchTarBar: {
    current: number;
  },
  checkIsAuthorized: {
    isAuthorized: boolean;
  }
}

type PageDispatchProps = {
  dispatchFetchPageData: () => any;
  switchTabPerson: () => any;
  dispatchAuthorized: () => any;
  dispatchNotAuthorized: () => any;
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
  title: string
}
interface LocationResult {
  status: number,
  message: string,
  result: any,
  request_id: string
}
@connect(({ fetchPageData, switchTarBar, checkIsAuthorized }) => ({
  fetchPageData,
  switchTarBar,
  checkIsAuthorized
}), (dispatch) => ({
  dispatchFetchPageData() {
    dispatch(dispatchFetchPageData())
  },
  switchTabPerson() {
    dispatch(switchTabPerson())
  },
  dispatchAuthorized() {
    dispatch(authorized())
  },
  dispatchNotAuthorized() {
    dispatch(notAuthorized())
  }
}))
class Index extends PureComponent {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  state = {
    location: ''
  }
  componentWillMount() {
    this.props.dispatchFetchPageData();
    getLocation().then((res: LocationResult) => {
      if (!isNullOrUndefined(res.result.address_component)) {
        const address_component = res.result.address_component
        if (!isNullOrUndefined(address_component)) {
          const province = address_component.province
          const city = address_component.city
          const district = address_component.district
          if (!isStringLengthEqualZero(province) || !isStringLengthEqualZero(city) || !isStringLengthEqualZero(district)) {
            this.setState({ location: `${province}${city}${district}` })
          }
          // Taro.checkSession({
          //   success: () => {
          //     this.props.dispatchAuthorized()
          //   },
          //   fail: () => {
          //     this.props.dispatchNotAuthorized()
          //     setTimeout(() => {
          //       Taro.switchTab({
          //         url: '/pages/person/person',
          //         success: () => {
          //           this.props.switchTabPerson()
          //         }
          //       })
          //     }, 200)
          //   }
          // })
          if (!this.props.checkIsAuthorized.isAuthorized) {
            setTimeout(() => {
              Taro.switchTab({
                url: '/pages/person/person',
                success: () => {
                  this.props.switchTabPerson()
                }
              })
            }, 200)
          }
        }
      }
    }).catch(() => {
      this.setState({ location: '无法获取当前位置' })
      Taro.checkSession({
        success: () => {
          this.props.dispatchAuthorized()
        },
        fail: () => {
          this.props.dispatchNotAuthorized()
          setTimeout(() => {
            Taro.switchTab({
              url: '/pages/person/person',
              success: () => {
                this.props.switchTabPerson()
              }
            })
          }, 200)
        }
      })
    })
  }

  componentDidMount() {


  }
  // componentWillReceiveProps () {
  //   // console.log(this.props, nextProps)
  // }

  // componentWillUnmount () { }

  // componentDidShow () { }

  // componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '校园换-首页',
    backgroundColor: '#C41A16',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#C41A16',
    navigationBarTextStyle: 'white'
  }

  onPullDownRefresh() {
    console.log("onPullDownRefresh")
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 1000);
  }
  onReachBottom() {
    console.log("onReachBottom");
  }
  render() {
    const waterFallDatas: WaterFallDatasType[] = [
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      },
      {
        imageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner1.png',
        avaterImageSrc: 'http://www.xiaoyuanhuan.xyz:3001/img/banner2.png',
        nickName: 'holifa',
        viewNumber: 65375,
        price: 3225.6,
        title: "iphonex 256 95新 要的快来"
      }

    ]
    return (
      <View
        className='index'
      >
        <IndexHeader location={this.state.location}></IndexHeader>
        <IndexGrid></IndexGrid>
        <IndexWaterFall datas={waterFallDatas}></IndexWaterFall>
        <AtToast isOpened={!this.props.checkIsAuthorized.isAuthorized} text="您好,请先登录！即将跳转到登录页..." status='loading' duration={200}></AtToast>
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

export default Index as ComponentClass<PageOwnProps, PageState>
