import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../../static-name/web-site'
import { AtAvatar } from 'taro-ui'
import Skeleton from 'taro-skeleton'
import './index.scss'
interface Props {
  data: {

  }
}
interface InitState {
  data: {
    nickName: string;
    gender: number;
    country: string;
    province: string;
    city: string;
    avatarUrl: string;
    school: string;
    id: string;
    education: string;
    grade: string;
    collage: string;
    userClass: string;
    userName: string;
    idCard: string;
    phone: string;
    userAddress: string;
  }
}
const initState: InitState = {
  data: {
    nickName: '',
    gender: 1,
    country: '',
    province: '',
    city: '',
    avatarUrl: '',
    school: '',
    id: '',
    education: '',
    grade: '',
    collage: '',
    userClass: '',
    userName: '',
    idCard: '',
    phone: '',
    userAddress: ''
  }
}
const SET_DATA = 'SET_DATA'
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_DATA:
      return Object.assign({}, state, {
        data:
        {
          nickName: action.data.nickName,
          gender: action.data.gender,
          country: action.data.country,
          province: action.data.province,
          city: action.data.city,
          avatarUrl: action.data.avatarUrl,
          school: action.data.school,
          id: action.data.id,
          education: action.data.education,
          grade: action.data.grade,
          collage: action.data.collage,
          userClass: action.data.userClass,
          userName: action.data.userName,
          idCard: action.data.idCard,
          phone: action.data.phone,
          userAddress: action.data.userAddress
        }
      })
    default:
      return state
  }
}
function ShowUserInfoContent(props: Props) {
  let [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    setLoading(false)
    dispatch({ type: SET_DATA, data: props.data })
  }, [props.data])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='show-user-info-content'>
        <View className='header'>
          <AtAvatar circle image={state.data.avatarUrl} size='large'></AtAvatar>
          <View className='header-middle'>
            <View className='nick-name'>{state.data.nickName}</View>
            <View className='sex'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/sex.png' className='icon'></Image>
              <View>性别：{state.data.gender === 1 ? '男' : '女'}</View>
            </View>
            <View className='school'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/security.png' className='icon'></Image>
              <View>学校：{state.data.school}</View>
            </View>
          </View>

        </View>
        <View className='body'>
          <View className='true-name row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/name.png' className='icon'></Image>
              <View>姓名：</View>
            </View>
            <View className='value'>{state.data.userName}</View>

          </View>
          <View className='id-card row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/id-card.png' className='icon'></Image>
              <View>身份证：</View>
            </View>
            <View className='value'>{state.data.idCard}</View>

          </View>
          <View className='education row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/education.png' className='icon'></Image>
              <View>学历:</View>
            </View>
            <View className='value'>{state.data.education}</View>
          </View>
          <View className='grade row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/class.png' className='icon'></Image>
              <View>年级:</View>
            </View>
            <View className='value'>{state.data.grade}</View>
          </View>
          <View className='id row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/id.png' className='icon'></Image>
              <View>学号:</View>
            </View>
            <View className='value'>{state.data.id}</View>
          </View>
          <View className='phone row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/phone.png' className='icon'></Image>
              <View>手机:</View>
            </View>
            <View className='value'>{state.data.phone}</View>
          </View>
          <View className='address row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/location.png' className='icon'></Image>
              <View>位置:</View>
            </View>
            <View className='value'>{state.data.country}/{state.data.province}/{state.data.city}</View>
          </View>
          <View className='collage row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/%E5%AD%A6%E9%99%A2.png' className='icon'></Image>
              <View>学院:</View>
            </View>
            <View className='value'>{state.data.collage}</View>
          </View>
          <View className='class row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/%E7%8F%AD%E7%BA%A7.png' className='icon'></Image>
              <View>班级:</View>
            </View>
            <View className='value'>{state.data.userClass}</View>
          </View>
          <View className='address row'>
            <View className='key'>
              <Image src='https://xiaoyuanhuan-1301020050.cos.ap-guangzhou.myqcloud.com/icon/show-user-info/detail_address.png' className='icon'></Image>
              <View>详细地址：</View>
            </View>
            <View className='value'>{state.data.userAddress}</View>
          </View>
        </View>
      </View>
    </Skeleton>
  )
}
ShowUserInfoContent.defaultProps = {
  data: {
    nickName: '',
    gender: 1,
    country: '',
    province: '',
    city: '',
    avatarUrl: '',
    school: '',
    id: '',
    education: '',
    grade: '',
    collage: '',
    userClass: '',
    userName: '',
    idCard: '',
    phone: '',
    userAddress: ''
  }
}
export default Taro.memo(ShowUserInfoContent)