import Taro, { useReducer } from '@tarojs/taro'
import { View, Text, Image, OpenData, Picker } from '@tarojs/components'
import { AtNoticebar, AtInput, AtForm, AtButton, AtToast } from 'taro-ui'
import { CDNWebSite } from '../../static-name/web-site'
import './index.scss'

interface InitState {
  schoolList: string[];
  selectedSchool: string;
  studentId: string;
  educationList: string[];
  education: string;
  gradeList: string[];
  grade: string;
  collage: string;
  class: string;
  name: string;
  idCard: string;
  phone: string;
  address: string;
  isSubmited:boolean;
}
const SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL'
const SET_STUDENT_ID = 'SET_STUDENT_ID'
const SET_GRADE = 'SET_GRADE'
const SET_EDUCATION = 'SET_EDUCATION'
const SET_COLLAGE = 'SET_COLLAGE'
const SET_CLASS = 'SET_CLASS'
const SET_NAME = 'SET_NAME'
const SET_IDCARD = 'SET_IDCARD'
const SET_PHONE = 'SET_PHONE'
const SET_ADDRESS = 'SET_ADDRESS'
const SUBMITED = 'SUBMITED'
function reducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_SCHOOL:
      return Object.assign(state, { selectedSchool: action.data })
    case SET_STUDENT_ID:
      return Object.assign(state, { studentId: action.data })
    case SET_EDUCATION:
      return Object.assign(state, { education: action.data })
    case SET_GRADE:
      return Object.assign(state, { grade: action.data })
    case SET_COLLAGE:
      return Object.assign(state, { collage: action.data })
    case SET_CLASS:
      return Object.assign(state, { class: action.data })
    case SET_NAME:
      return Object.assign(state, { name: action.data })
    case SET_IDCARD:
      return Object.assign(state, { id: action.data })
    case SET_PHONE:
      return Object.assign(state, { phone: action.data })
    case SET_ADDRESS:
      return Object.assign(state, { address: action.data })
    case SUBMITED:
      return Object.assign(state, { isSubmited: true })
    default:
      return state
  }
}
function UserRegister() {
  const initState: InitState = {
    schoolList: ['广州大学', '广东工业大学', '广东美术学院'],
    selectedSchool: '请点我选择大学',
    studentId: '',
    educationList: ['专科', '本科', '硕士', '博士'],
    education: '请点我选择学历',
    gradeList: ['大一', '大二', '大三', '大四'],
    grade: '请点我选择年级',
    collage: '',
    class: '',
    name: '',
    idCard: '',
    phone: '',
    address: '',
    isSubmited:false,
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
        <View className='step'>
          <View className='title'>1.请选择您的大学名称:</View>
          <AtNoticebar>以下大学列表由系统根据您目前所在地查找</AtNoticebar>
          <Picker mode='selector' range={state.schoolList} onChange={(e) => {
            dispatch({ type: SET_SELECTED_SCHOOL, data: state.schoolList[e.detail.value] })
          }}
            value={0}
          >
            <View className='picker-container'>
              <View className='picker-title'>您的大学：</View>
              <View className='picker'>{state.selectedSchool}</View>
            </View>
          </Picker>
        </View>

        <View className='step'>
          <View className='title'>2.请输入您所在大学的学号:</View>
          <AtInput
            name='student-id'
            type='text'
            placeholder='请在此输入您的学号'
            value={state.studentId}
            onChange={(value) => {
              dispatch({ type: SET_STUDENT_ID, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>3.请选择您的学历:</View>
          <Picker mode='selector' range={state.educationList} onChange={(e) => {
            dispatch({ type: SET_EDUCATION, data: state.educationList[e.detail.value] })
          }}
            value={0}
          >
            <View className='picker-container'>
              <View className='picker-title'>您的学历：</View>
              <View className='picker'>{state.education}</View>
            </View>
          </Picker>
        </View>

        <View className='step'>
          <View className='title'>4.请选择您的年级:</View>
          <Picker mode='selector' range={state.gradeList} onChange={(e) => {
            dispatch({ type: SET_GRADE, data: state.gradeList[e.detail.value] })
          }}
            value={0}
          >
            <View className='picker-container'>
              <View className='picker-title'>您的年级：</View>
              <View className='picker'>{state.grade}</View>
            </View>
          </Picker>
        </View>

        <View className='step'>
          <View className='title'>5.请输入您的学院名称:</View>
          <AtInput
            name='collage'
            type='text'
            placeholder='请在此输入您的学院名称'
            value={state.collage}
            onChange={(value) => {
              dispatch({ type: SET_COLLAGE, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>6.请输入您的专业及班级名称:</View>
          <AtInput
            name='class'
            type='text'
            placeholder='请在此输入您的班级名称'
            value={state.class}
            onChange={(value) => {
              dispatch({ type: SET_CLASS, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>7.请输入您的姓名:</View>
          <AtInput
            name='name'
            type='text'
            placeholder='请在此输入您的姓名'
            value={state.name}
            onChange={(value) => {
              dispatch({ type: SET_NAME, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>8.请输入您的身份证:</View>
          <AtInput
            name='idcard'
            type='idcard'
            placeholder='请在此输入您的身份证'
            value={state.idCard}
            onChange={(value) => {
              dispatch({ type: SET_IDCARD, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>9.请输入您的手机号码:</View>
          <AtInput
            name='phone'
            type='phone'
            placeholder='请在此输入您的手机号'
            value={state.phone}
            onChange={(value) => {
              dispatch({ type: SET_PHONE, data: value })
            }}
          />
        </View>

        <View className='step'>
          <View className='title'>10.请输入您在学校的具体地址:</View>
          <AtInput
            name='address'
            type='text'
            placeholder='请最好输入具体到宿舍号的地址'
            value={state.address}
            onChange={(value) => {
              dispatch({ type: SET_ADDRESS, data: value })
            }}
          />
        </View>
      </View>
      <View className='submit'>
        <AtButton type='primary' full onClick={() => {
          console.log(state)
          dispatch({type:SUBMITED})
          setTimeout(() => {
            Taro.navigateBack()
          }, 1000);
        }}>确认无误，提交以上信息注册!</AtButton>
      </View>
      <AtToast isOpened={state.isSubmited} text="提交成功！" status='success' duration={1000}></AtToast>
    </View>
  )
}

export default Taro.memo(UserRegister)