import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image, Button, OpenData } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function checkIsLogin(setIsLogin) {
  Taro.getSetting({
    success: function (res) {
      console.log(res.authSetting)
      // res.authSetting = {
      //   "scope.userInfo": true,
      //   "scope.userLocation": true
      // }
      if (res.authSetting["scope.userInfo"] === true) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }
  })
}
function UserInfo() {
  let [loading, setLoading] = useState(true)
  let [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    checkIsLogin(setIsLogin)
  }, [isLogin])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='user-info-container'>
        <View className='user-info-functional'>
          <Image src={`${CDNWebSite}/icon/user-info/setting.png`} className='setting-image'></Image>
          <Image src={`${CDNWebSite}/icon/user-info/qr-code.png`} className='qr-code-image'></Image>
        </View>
        <View className='user-info'>
          {!isLogin ? <Image src={`${CDNWebSite}/icon/user-info/default-avatar-white.png`} className='avatar'></Image> : <OpenData
            type='userAvatarUrl'
            default-avatar={`${CDNWebSite}/icon/user-info/default-avatar-white.png`}
            className='avatar'
          ></OpenData>}
          {!isLogin ? null : <OpenData type='userNickName' className='nick-name'></OpenData>}
          {isLogin ? null : <Button type='warn'
            openType='getUserInfo'
            onGetUserInfo={(res) => {
              console.log(res.detail)
              Taro.login({
                success(res) {
                  console.log(res)
                  checkIsLogin(setIsLogin)
                }
              })
            }
            }
            className='login-and-register'
            >登录/注册</Button>}
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(UserInfo)