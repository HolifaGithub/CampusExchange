import Taro, { useReducer } from '@tarojs/taro'
import { View, Text, Image, OpenData, Picker } from '@tarojs/components'
import { AtNoticebar, AtInput, AtForm } from 'taro-ui'
import { CDNWebSite } from '../../static-name/web-site'
import './index.scss'

interface InitState {
  schoolList: string[];
  selectedSchool: string;
  studentId: number;
}
const SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL'
const SET_STUDENT_ID = 'SET_STUDENT_ID'
function reducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_SCHOOL:
      return Object.assign(state, { selectedSchool: action.data })
    case SET_STUDENT_ID:
      return Object.assign(state, { studentId: action.data })
    default:
      return state
  }
}
function UserRegister() {
  const initState: InitState = {
    schoolList: ['广州大学', '广东工业大学', '广东美术学院'],
    selectedSchool: '广州大学',
    studentId: 0
  }
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <View className='user-register-conatiner'>
      <View className='location'>
        <Image src={`${CDNWebSite}/icon/register/location.png`} className='icon'></Image>
        <OpenData type='userCountry' lang='zh_CN'></OpenData>
        <OpenData type='userProvince' lang='zh_CN'></OpenData>
        <OpenData type='userCity' lang='zh_CN'></OpenData>
      </View>
      <View className='register-content'>
        <View className='step-1'>
          <View className='title'>1.请选择您的大学名称:</View>
          <AtNoticebar>注意:以下大学列表由系统根据您目前所在地查找的大学！</AtNoticebar>
          <Picker mode='selector' range={state.schoolList} onChange={(e) => {
            dispatch({ type: SET_SELECTED_SCHOOL, data: state.schoolList[e.detail.value] })
          }}
            value={0}
          >
            <View className='picker'>
              当前选择：{state.selectedSchool}
            </View>
          </Picker>
        </View>

        <View className='step-2'>
          <View className='title'>1.请选择您所在大学的学号:</View>
          <AtInput
            name='student-id'
            title='学号:'
            type='number'
            placeholder='请在此输入您的学号'
            value={state.studentId}
            onChange={(value) => { 
              console.log(value)
              dispatch({type:SET_STUDENT_ID,data:value})}}
          />
        </View>
      </View>
    </View>
  )
}

export default Taro.memo(UserRegister)