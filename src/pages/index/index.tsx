import { ComponentClass } from 'react'
import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatchFetchPageData } from '../../actions/fetchPageData'
import './index.scss'
import HeaderTitle from '../../components/component-header-title'
import IndexHeader from '../../floors/floor-index-header'
import IndexGrid from '../../floors/floor-index-grid'
import IndexWaterFall from '../../floors/floor-index-waterfall'
import { AtToast, AtActivityIndicator } from "taro-ui"
import { ClDivider } from "mp-colorui";
import getLocation from '../../utils/getLocation'
import promiseApi from '../../utils/promiseApi'
import getSystemInfo from '../../utils/getSystemInfo'
import { server, port, protocol } from '../../static-name/server'
import isNullOrUndefined from '../../utils/isNullOrUndefined'
import isStringLengthEqualZero from '../../utils/isStringLengthEqualZero'
import { switchTabPerson } from '../../actions/switchTabBar'
import {addItem,addMessageNum} from '../../actions/chatListMessageNum'
import { needRelogin, notNeedRelogin } from '../../actions/checkIsNeedRelogin'

type PageStateProps = {
  fetchPageData: {
    fetchPageDataStatus: string;
    pageData: [];
  },
  switchTarBar: {
    current: number;
  },
  checkIsNeedRelogin: {
    isNeedRelogin: boolean;
  },
  chatListMessageNum:any
}

type PageDispatchProps = {
  dispatchFetchPageData: () => any;
  switchTabPerson: () => any;
  dispatchNeedRelogin: () => any;
  dispatchNotNeedRelogin: () => any;
  dispatchAddItem:(id)=>any;
  dispatchAddMessageSum:(id,notViewMessageNum)=>any;
}

type PageOwnProps = {}
type WaterFallDatasType = {
  orderId: string;
  nameInput: string;
  newAndOldDegree: string;
  mode: string;
  objectOfPayment: string;
  payForMePrice: number;
  payForOtherPrice: number;
  wantExchangeGoods: string;
  topPicSrc: string;
  watchedPeople: number;
  nickName: string;
  avatarUrl: string;
}
type PageState = {
  location: string;
  isSessionEffective: boolean;
  waterFallDatas: WaterFallDatasType[][];
  loadMore: boolean;
  page: number;
  hasMore: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}


interface LocationResult {
  status: number,
  message: string,
  result: any,
  request_id: string
}
@connect(({ fetchPageData, switchTarBar, checkIsNeedRelogin,chatListMessageNum }) => ({
  fetchPageData,
  switchTarBar,
  checkIsNeedRelogin,
  chatListMessageNum
}), (dispatch) => ({
  dispatchFetchPageData() {
    dispatch(dispatchFetchPageData())
  },
  switchTabPerson() {
    dispatch(switchTabPerson())
  },
  dispatchNeedRelogin() {
    dispatch(needRelogin())
  },
  dispatchNotNeedRelogin() {
    dispatch(notNeedRelogin())
  },
  dispatchAddItem(id){
    dispatch(addItem(id))
  },
  dispatchAddMessageSum(id,notViewMessageNum){
    dispatch(addMessageNum(id,notViewMessageNum))
  }
}))
class Index extends PureComponent {
  state = {
    location: '',
    isSessionEffective: false,
    waterFallDatas: [],
    loadMore: false,
    page: 1,
    hasMore: true
  }
  fetchNotViewMessageNum(){
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getnotviewmessagenum`,
          method: 'GET',
          data: {
            code: loginResult.code,
          }
        }).then(res => {
          console.log( res);
          if (res.statusCode === 200 && res.data.status === 'success') {
                const len =res.data.returnDatas.datas.length 
                const datas = res.data.returnDatas.datas
                 if(len>0){
                    for(let i =0;i<len;i++){
                      const {id,notViewMessageNum} = datas[i]
                      this.props.dispatchAddItem(id)
                      this.props.dispatchAddMessageSum(id,notViewMessageNum)
                    }
                 }
          } else {
            console.log('获取未读消息失败！')
          }
        }).catch(()=>{
          console.log('获取未读消息请求失败！');
        })
      }
    })
  }
  componentWillMount() {
    this.fetchWaterFallData()
    this.fetchNotViewMessageNum()
    getLocation().then((res: LocationResult) => {
      if (!isNullOrUndefined(res.result.address_component)) {
        const address_component = res.result.address_component
        if (!isNullOrUndefined(address_component)) {
          const province = address_component.province
          const city = address_component.city
          const district = address_component.district
          if (!isStringLengthEqualZero(province) || !isStringLengthEqualZero(city) || !isStringLengthEqualZero(district)) {
            // this.setState({ location: `${province}${city}${district}` })
              promiseApi(Taro.checkSession)().then(() => {
                this.setState({
                  isSessionEffective: true,
                  location: `${province}${city}${district}`
                }, () => {
                  if (this.props.checkIsNeedRelogin.isNeedRelogin || !this.state.isSessionEffective) {
                    setTimeout(() => {
                      Taro.switchTab({
                        url: '/pages/person/person',
                        success: () => {
                          this.props.switchTabPerson()
                        }
                      })
                    }, 300)
                  }
                })
              })
                this.setState({
                  isSessionEffective: false,
                  location: `${province}${city}${district}`
                }, () => {
                  if (this.props.checkIsNeedRelogin.isNeedRelogin || !this.state.isSessionEffective) {
                    setTimeout(() => {
                      Taro.switchTab({
                        url: '/pages/person/person',
                        success: () => {
                          this.props.switchTabPerson()
                        }
                      })
                    }, 300)
                  }
                })

            // console.log(this.props.checkIsNeedRelogin.isNeedRelogin,this.state.isSessionEffective)
          }
        }
      }
    }).catch(() => {
      // this.fetchWaterFallData()
      promiseApi(Taro.checkSession)().then(() => {
        this.setState({
          isSessionEffective: true,
          location: '无法获取当前位置'
        })
      }).catch(() => {
        this.setState({
          isSessionEffective: false,
          location: '无法获取当前位置'
        })
      })
      // this.setState({ location: '无法获取当前位置' })
      if (this.props.checkIsNeedRelogin.isNeedRelogin || !this.state.isSessionEffective) {
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/person/person',
            success: () => {
              this.props.switchTabPerson()
            }
          })
        }, 300)
      }
    })
  }
  fetchWaterFallData() {
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getwaterfall`,
          method: 'GET',
          data: {
            code: loginResult.code,
            page: 1
          }
        }).then(res => {
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length > 0) {
              this.setState((prevState: PageState) => {
                // console.log('prevState',prevState)     
                return { waterFallDatas: [res.data.returnDatas] }
              })
            }else{
              console.log('获取瀑布流数据成功但无数据！');
            }
          } else {
            console.log('获取瀑布流数据失败！')
          }
        }).catch(()=>{
          console.log('aaa');
        })
      }
    })
  }
  fetchMoreData() {
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        promiseApi(Taro.request)({
          url: `${protocol}://${server}:${port}/getwaterfall`,
          method: 'GET',
          data: {
            code: loginResult.code,
            page: ++this.state.page
          }
        }).then(res => {
          // console.log(res)
          if (res.statusCode === 200 && res.data.status === 'success') {
            if (res.data.returnDatas.length === 0) {
              this.setState({
                hasMore: false,
                loadMore: false
              })
            } else {
              this.setState((prevState: PageState) => {
                // console.log('prevState',prevState)
                return {
                  loadMore: false,
                  waterFallDatas: prevState.waterFallDatas.concat([res.data.returnDatas])
                }
              })
            }
          } else {
            console.log('获取瀑布流数据失败！')
          }
        })
      }
    })
  }
  // componentWillReceiveProps () {
  //   // console.log(this.props, nextProps)
  // }

  // componentWillUnmount () { }

  // componentDidShow () {
  //   console.log("show")
  //   this.fetchWaterFallData()
  //  }

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
    this.fetchWaterFallData()
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 1000);
  }
  onReachBottom() {
    console.log("onReachBottom");
    if (this.state.hasMore) {
      this.setState({ loadMore: true })
      this.fetchMoreData()
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.hasMore !== nextState.hasMore|| this.state.waterFallDatas.length!==nextState.waterFallDatas.length) {
  //     return true
  //   } else {
  //     return false
  //   }

  // }
  render() {
    // console.log(this.state.page, this.state.waterFallDatas)
    const tarBarHeight = (getSystemInfo().tabBarHeight + 35) + 'px'
    return (
      <View
        className='index'
      >
        <IndexHeader location={this.state.location}></IndexHeader>
        <IndexGrid></IndexGrid>
        <HeaderTitle></HeaderTitle>
        <IndexWaterFall datas={this.state.waterFallDatas}></IndexWaterFall>
        {this.state.loadMore ? <View className='loading'>
          <AtActivityIndicator content='加载中...' color='#ffffff' mode='center' size={36}></AtActivityIndicator>
        </View> : null}
        {this.state.hasMore ? null : <ClDivider color='red'>没有更多了！</ClDivider>}
        <View className='block' style={{ height: tarBarHeight }}></View>
        <AtToast isOpened={this.props.checkIsNeedRelogin.isNeedRelogin || !this.state.isSessionEffective} text="您好,请先登录！即将跳转到登录页..." status='loading' duration={300}></AtToast>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
