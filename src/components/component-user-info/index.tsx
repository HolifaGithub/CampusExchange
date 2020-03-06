import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { AtModal, AtToast } from "taro-ui"
import { View, Text, Image, Button, OpenData } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { CDNWebSite } from '../../static-name/web-site'
import promiseApi from '../../utils/promiseApi'
import Skeleton from 'taro-skeleton'
import { needRelogin, notNeedRelogin } from '../../actions/checkIsNeedRelogin'
import { server, port, protocol } from '../../static-name/server'
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
  checkIsNeedRelogin: {
    isNeedRelogin: boolean;
  }
}

type PageDispatchProps = {
  dispatchNeedRelogin: () => any;
  dispatchNotNeedRelogin: () => any;
}

type PageOwnProps = {
  isSessionEffective: boolean;
}

type PageState = {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface UserInfo {
  props: IProps;
}

@connect(({ checkIsNeedRelogin }) => ({
  checkIsNeedRelogin
}), (dispatch) => ({
  dispatchNeedRelogin() {
    dispatch(needRelogin())
  },
  dispatchNotNeedRelogin() {
    dispatch(notNeedRelogin())
  }
}))
class UserInfo extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  constructor(props) {
    super(props)

  }
  state = {
    loading: true,
    isNewUser: false,
    tradeSuccess: false,
    tradeFail: false
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 200)
  }


  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  qrCodeOnClick() {
    promiseApi(Taro.scanCode)({
      onlyFromCamera: true,
      scanType: 'qrCode'
    }).then((res) => {
      const scanResult = res.result
      promiseApi(Taro.login)().then((loginResult) => {
        const code = loginResult.code
        if (code) {
          promiseApi(Taro.request)({
            url: `${protocol}://${server}:${port}/tradingscancode`,
            method: 'POST',
            data: {
              code: code,
              scanResult: scanResult
            }
          }).then((res) => {
            if (res.statusCode === 200 && res.data.status === 'success') {
              this.setState({ tradeSuccess: true })
            } else {
              this.setState({ tradeFail: true })
            }
          })
        }
      })
    })
  }
  settingOnClick() {
    promiseApi(Taro.login)().then((loginResult) => {
      if (loginResult.code) {
        this.$preload('code', loginResult.code)
        promiseApi(Taro.navigateTo)({ url: `/packageA/pages/show_user_info/show_user_info` })
      }
    })
  }
  render() {
    const isLogin = this.props.isSessionEffective && !this.props.checkIsNeedRelogin.isNeedRelogin
    // console.log('isSessionEffective ',this.props.isSessionEffective ,'isNeedRelogin',this.props.checkIsNeedRelogin.isNeedRelogin)
    return (
      <Skeleton
        row={1}
        rowHeight={60}
        animate
        loading={this.state.loading}
      >
        <View className='user-info-container'>
          <View className='user-info-functional'>
            <View onClick={() => { this.settingOnClick() }} hoverClass='hover'>
              <Image src={`${CDNWebSite}/icon/user-info/setting.png`} className='setting-image'></Image>
            </View>

            <View onClick={() => { this.qrCodeOnClick() }} hoverClass='hover'>
              <Image src={`${CDNWebSite}/icon/user-info/qr-code.png`} className='qr-code-image'></Image>
            </View>
          </View>
          <View className='user-info'>
            {isLogin ? <OpenData
              type='userAvatarUrl'
              default-avatar={`${CDNWebSite}/icon/user-info/default-avatar-white.png`}
              className='avatar'
            ></OpenData> : <Image src={`${CDNWebSite}/icon/user-info/default-avatar-white.png`} className='avatar'></Image>}
            {isLogin ? <OpenData type='userNickName' className='nick-name'></OpenData> : null}
            {!isLogin ? <Button type='warn'
              openType='getUserInfo'
              onGetUserInfo={(userInfoResult) => {
                if (userInfoResult.detail.errMsg === 'getUserInfo:ok') {
                  Taro.login({
                    success: (loginResult) => {
                      Taro.request({
                        url: `${protocol}://${server}:${port}/login`,
                        method: 'POST',
                        data: {
                          code: loginResult.code,
                          rawData: userInfoResult.detail.rawData,
                          signature: userInfoResult.detail.signature,
                          encryptedData: userInfoResult.detail.encryptedData,
                          iv: userInfoResult.detail.iv
                        },
                        success: (res) => {
                          console.log("用户登录请求成功！返回数据：", res)
                          if (res.data.status === 'success' && res.statusCode === 200) {
                            this.props.dispatchNotNeedRelogin()
                            this.setState({
                              isSessionEffective: true,
                              isNewUser: res.data.isNewUser
                            })
                          } else {
                            console.log("用户登录失败！")
                            this.props.dispatchNeedRelogin()
                            Taro.showToast({
                              title: '登录失败！',
                              icon: 'none',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }
                  })
                }
              }
              }
              className='login-and-register'
              hoverClass='hover'
            >登录/注册</Button> : null}
            {this.state.isNewUser ? <AtModal
              isOpened
              title='系统检测到您为新用户'
              confirmText='进去填写'
              onConfirm={() => {
                this.setState({ isNewUser: false })
                Taro.navigateTo({
                  url: '/packageA/pages/register/register'
                })
              }}
              content='Hello！新用户，欢迎来到校园换，现在需要填写一些关于您的详细信息，谢谢您的配合！'
            /> : null}
          </View>
          <AtToast isOpened={this.state.tradeSuccess} text="交易成功！" icon="check" onClose={() => {
            promiseApi(Taro.navigateTo)({
              url: 'pages/trade-success/trade-success'
            })
          }}></AtToast>
          <AtToast isOpened={this.state.tradeFail} text="交易失败！" icon="close"></AtToast>
        </View>
      </Skeleton>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default UserInfo as ComponentClass<PageOwnProps, PageState>