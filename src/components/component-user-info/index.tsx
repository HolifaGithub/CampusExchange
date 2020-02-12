import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { View, Text, Image, Button, OpenData } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

interface InitState {
  loading: boolean;
  isAuthorized: boolean;
  isNewUser: boolean;
}
const LOADING_COMPLETE = 'LOADING_COMPLETE'
const AUTHORIZED = 'AUTHORIZED'
const NOT_AUTHORIZED = 'NOT_AUTHORIZED'
const IS_NEW_USER='IS_NEW_USER'
const NOT_NEW_USER='NOT_NEW_USER'
function reducer(state, action) {
  switch (action.type) {
    case LOADING_COMPLETE:
      return Object.assign(state, { loading: false })
    case AUTHORIZED:
      return Object.assign(state, { isAuthorized: true })
    case NOT_AUTHORIZED:
      return Object.assign(state, { isAuthorized: false })
    case IS_NEW_USER:
      return Object.assign(state,{isNewUser:true})
    case NOT_NEW_USER:
      return Object.assign(state,{isNewUser:false})
    default:
      return state
  }
}

function checkIsAuthorized(dispatch) {
  Taro.getSetting({
    success: function (res) {
      if (res.authSetting["scope.userInfo"] === true) {
        dispatch({ type: AUTHORIZED })
      } else {
        dispatch({ type: NOT_AUTHORIZED })
      }
    }
  })
}
function checkIsNeedRegister(dispatch) {
  dispatch({type:IS_NEW_USER})
}

function UserInfo() {
  const initState: InitState = {
    loading: true,
    isAuthorized: false,
    isNewUser: false,
  }
  const [state, dispatch] = useReducer(reducer, initState)
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: LOADING_COMPLETE })
    }, 1000)
    checkIsAuthorized(dispatch)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={state.loading}
    >
      <View className='user-info-container'>
        <View className='user-info-functional'>
          <Image src={`${CDNWebSite}/icon/user-info/setting.png`} className='setting-image'></Image>
          <Image src={`${CDNWebSite}/icon/user-info/qr-code.png`} className='qr-code-image'></Image>
        </View>
        <View className='user-info'>
          {!state.isAuthorized ? <Image src={`${CDNWebSite}/icon/user-info/default-avatar-white.png`} className='avatar'></Image> : <OpenData
            type='userAvatarUrl'
            default-avatar={`${CDNWebSite}/icon/user-info/default-avatar-white.png`}
            className='avatar'
          ></OpenData>}
          {!state.isAuthorized ? null : <OpenData type='userNickName' className='nick-name'></OpenData>}
          {state.isAuthorized ? null : <Button type='warn'
            openType='getUserInfo'
            onGetUserInfo={(res) => {
              console.log(res.detail)
              Taro.login({
                success(res) {
                  console.log(res)
                  checkIsAuthorized(dispatch)
                  checkIsNeedRegister(dispatch)
                }
              })
            }
            }
            className='login-and-register'
          >登录/注册</Button>}
          {state.isNewUser ? <AtModal
            isOpened
            title='系统检测到您为新用户'
            confirmText='进去填写'
            onConfirm={()=>{
              dispatch({type:NOT_NEW_USER})
              Taro.navigateTo({
                url: '/pages/register/register'
              })
            }}
            content='Hello！新用户，欢迎来到校园换，现在需要填写一些关于您的详细信息，谢谢您的配合！'
          /> : null}
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(UserInfo)