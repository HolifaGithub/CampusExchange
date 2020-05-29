// import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
// import { View, Text, Image, Button } from '@tarojs/components'
// import { AtSteps, AtRadio, AtImagePicker, AtTextarea, AtInput, AtButton, AtInputNumber, AtToast } from 'taro-ui'
// import goodsTypeGridsDatas from '../../static-name/goods-sort'
// import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
// import { CDNWebSite } from '../../static-name/web-site'
// import { server, port,protocol } from '../../static-name/server'
// import productOrderId from '../../utils/productOrderId'
// import orderStatusObject from '../../static-name/order-status'
// import Skeleton from 'taro-skeleton'
// import './index.scss'
// interface TypeAtRadioOptionsList {
//   label: string;
//   value: string;
// }
// interface TypeTwoDatas {
//   typeThree: string;
//   imageSrc: string;
// }
// interface TypeTwo {
//   typeTwo: string;
//   trademark: string;
//   typeTwoDatas: TypeTwoDatas[];
// }
// interface InitState {
//   typeOneList: TypeAtRadioOptionsList[];
//   typeTwoList: TypeAtRadioOptionsList[];
//   typeThreeList: TypeAtRadioOptionsList[];
//   typeOneDatas: TypeTwo[],
//   loading: boolean;
//   current: number;
//   typeOne: string;
//   isSelectedTypeOne: boolean;
//   typeTwo: string;
//   isSelectedTypeTwo: boolean;
//   typeThree: string;
//   isSelectedTypeThree: boolean;
//   isCustomTypeThree: boolean;
//   nameInput: string;
//   goodsNumber: number;
//   newAndOldDegree: string;
//   isSelectedDegree: boolean;
//   mode: string;
//   payForMePrice: number;
//   wantExchangeGoods: string;
//   objectOfPayment: string;
//   payForOtherPrice: number;
//   describe: string;
//   files: Array<any>;
//   isRelease: boolean;
// }

// const TYPE_ONE_LIST_PUSH_OPTIONS = 'TYPE_ONE_LIST_PUSH_OPTIONS'
// const TYPE_TWO_LIST_PUSH_OPTIONS = 'TYPE_TWO_LIST_PUSH_OPTIONS'
// const TYPE_THREE_LIST_PUSH_OPTIONS = 'TYPE_THREE_LIST_PUSH_OPTIONS'
// const RECORD_TYPE_ONE_DATAS = 'RECORD_TYPE_ONE_DATAS'
// const LOADING_SUCCESS = 'LOADING_SUCCESS'
// const SET_CURRENT = 'SET_CURRENT'
// const SET_TYPE_ONE = 'SET_TYPE_ONE'
// const SELECTED_TYPE_ONE = 'SELECTED_TYPE_ONE'
// const SET_TYPE_TWO = 'SET_TYPE_TWO'
// const SELECTED_TYPE_TWO = 'SELECTED_TYPE_TWO'
// const SET_TYPE_THREE = 'SET_TYPE_THREE'
// const SELECTED_TYPE_THREE = 'SELECTED_TYPE_THREE'
// const CUSTOM_TYPE_THREE = 'CUSTOM_TYPE_THREE'
// const SET_NAME_INPUT = 'SET_NAME_INPUT'
// const SET_GOODS_NUMBER = 'SET_GOODS_NUMBER'
// const SET_NEW_AND_OLD_DEGREE = 'SET_NEW_AND_OLD_DEGREE'
// const SELECTED_DEGREE = 'SELECTED_DEGREE'
// const SET_MODE = 'SET_MODE'
// const SET_PAY_FOR_ME_PRICE = 'SET_PAY_FOR_ME_PRICE'
// const SET_WANT_EXCHANGE_GOODS = 'SET_WANT_EXCHANGE_GOODS'
// const SET_OBJECT_OF_PAYMENT = 'SET_OBJECT_OF_PAYMENT'
// const SET_PAY_FOR_OTHER_PRICE = 'SET_PAY_FOR_OTHER_PRICE'
// const SET_DESCRIBE = 'SET_DESCRIBE'
// const SET_FILES = 'SET_FILES'
// const RELEASED = 'RELEASED'
// const NOT_RELEASED = 'NOT_RELEASED'
// const RESET = 'RESET'

// const initState: InitState = {
//   typeOneList: [],
//   typeTwoList: [],
//   typeThreeList: [],
//   typeOneDatas: [],
//   loading: true,
//   current: 0,
//   typeOne: '',
//   isSelectedTypeOne: false,
//   typeTwo: '',
//   isSelectedTypeTwo: false,
//   typeThree: '',
//   isSelectedTypeThree: false,
//   isCustomTypeThree: false,
//   nameInput: '',
//   goodsNumber: 1,
//   newAndOldDegree: '',
//   isSelectedDegree: false,
//   mode: '',
//   payForMePrice: 0,
//   wantExchangeGoods: '',
//   objectOfPayment: 'payForMe',
//   payForOtherPrice: 0,
//   describe: '',
//   files: [],
//   isRelease: false,
// }
// function reducer(state = initState, action) {
//   switch (action.type) {
//     case TYPE_ONE_LIST_PUSH_OPTIONS:
//       return Object.assign({}, state, { typeOneList: action.data })
//     case TYPE_TWO_LIST_PUSH_OPTIONS:
//       return Object.assign({}, state, { typeTwoList: action.data })
//     case TYPE_THREE_LIST_PUSH_OPTIONS:
//       return Object.assign({}, state, { typeThreeList: action.data })
//     case RECORD_TYPE_ONE_DATAS:
//       return Object.assign({}, state, { typeOneDatas: action.data })
//     case LOADING_SUCCESS:
//       return Object.assign({}, state, { loading: false })
//     case SET_CURRENT:
//       return Object.assign({}, state, { current: action.data })
//     case SET_TYPE_ONE:
//       return Object.assign({}, state, { typeOne: action.data })
//     case SELECTED_TYPE_ONE:
//       return Object.assign({}, state, { isSelectedTypeOne: action.data })
//     case SET_TYPE_TWO:
//       return Object.assign({}, state, { typeTwo: action.data })
//     case SELECTED_TYPE_TWO:
//       return Object.assign({}, state, { isSelectedTypeTwo: action.data })
//     case SET_TYPE_THREE:
//       return Object.assign({}, state, { typeThree: action.data })
//     case SELECTED_TYPE_THREE:
//       return Object.assign({}, state, { isSelectedTypeThree: action.data })
//     case CUSTOM_TYPE_THREE:
//       return Object.assign({}, state, { isCustomTypeThree: true })
//     case SET_NAME_INPUT:
//       return Object.assign({}, state, { nameInput: action.data })
//     case SET_GOODS_NUMBER:
//       return Object.assign({}, state, { goodsNumber: action.data })
//     case SET_NEW_AND_OLD_DEGREE:
//       return Object.assign({}, state, { newAndOldDegree: action.data })
//     case SELECTED_DEGREE:
//       return Object.assign({}, state, { isSelectedDegree: action.data })
//     case SET_MODE:
//       return Object.assign({}, state, { mode: action.data })
//     case SET_PAY_FOR_ME_PRICE:
//       return Object.assign({}, state, { payForMePrice: action.data })
//     case SET_WANT_EXCHANGE_GOODS:
//       return Object.assign({}, state, { wantExchangeGoods: action.data })
//     case SET_OBJECT_OF_PAYMENT:
//       return Object.assign(state, { objectOfPayment: action.data })
//     case SET_PAY_FOR_OTHER_PRICE:
//       return Object.assign({}, state, { payForOtherPrice: action.data })
//     case SET_DESCRIBE:
//       return Object.assign({}, state, { describe: action.data })
//     case SET_FILES:
//       return Object.assign({}, state, { files: action.data })
//     case RELEASED:
//       return Object.assign({}, state, { isRelease: true })
//     case NOT_RELEASED:
//       return Object.assign({}, state, { isRelease: false })
//     case RESET:
//       return Object.assign({}, initState, { loading: false, isRelease: false })
//     default:
//       return state
//   }
// }
// function ReleaseGoodsSteps() {
//   const [state, dispatch] = useReducer(reducer, initState);
//   let _typeOneList: TypeAtRadioOptionsList[] = []
//   let _typeTwoList: TypeAtRadioOptionsList[] = []
//   let _typeThreeList: TypeAtRadioOptionsList[] = []
//   useEffect(() => {
//     for (let i of goodsTypeGridsDatas) {
//       _typeOneList.push({ label: i.typeOne, value: i.typeOne })
//     }
//     dispatch({ type: TYPE_ONE_LIST_PUSH_OPTIONS, data: _typeOneList })
//   }, [_typeOneList])
//   const items = [
//     {
//       'title': '步骤一',
//       'desc': '请您选择物品的分类以及名称信息',
//       'success': true
//     },
//     {
//       'title': '步骤二',
//       'desc': '请您填写物品的数量、新旧、价格以及交易形式'
//     },
//     {
//       'title': '步骤三',
//       'desc': '请您上传物品的图片以及描述信息',
//     }
//   ]
//   return (
//       <View className='release-goods-steps'>
//         <AtSteps
//           items={items}
//           current={state.current}
//           onChange={(current) => { dispatch({ type: SET_CURRENT, data: current }) }}
//         />
//         {state.current === 0 ? <View className='step-1'>
//           <View className='step-1-text' onClick={() => {
//             dispatch({ type: SELECTED_TYPE_ONE, data: !state.isSelectedTypeOne })
//           }}>
//             <Text>1.请选择物品的一级分类：{state.typeOne}</Text>
//             {state.isSelectedTypeOne ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
//           </View>
//           {state.isSelectedTypeOne ? null :
//             <AtRadio
//               options={state.typeOneList}
//               value={state.typeOne}
//               onClick={(value) => {
//                 dispatch({ type: SET_TYPE_ONE, data: value })
//                 dispatch({ type: SELECTED_TYPE_ONE, data: true })
//                 for (let i of goodsTypeGridsDatas) {
//                   if (i.typeOne === value) {
//                     for (let j = 0; j < i.typeOneDatas.length; j++) {
//                       _typeTwoList.push({
//                         label: i.typeOneDatas[j].typeTwo,
//                         value: i.typeOneDatas[j].typeTwo
//                       })
//                     }
//                     dispatch({ type: RECORD_TYPE_ONE_DATAS, data: i.typeOneDatas })
//                   }
//                 }
//                 dispatch({
//                   type: TYPE_TWO_LIST_PUSH_OPTIONS,
//                   data: _typeTwoList
//                 })
//               }}
//             />}

//           <View className='step-1-text' onClick={() => {
//             dispatch({ type: SELECTED_TYPE_TWO, data: !state.isSelectedTypeTwo })
//           }}>
//             <Text>2.请选择物品的二级分类：{state.typeTwo}</Text>
//             {state.isSelectedTypeTwo ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
//           </View>
//           {state.isSelectedTypeTwo ? null : <AtRadio
//             options={state.typeTwoList}
//             value={state.typeTwo}
//             onClick={(value) => {
//               dispatch({ type: SET_TYPE_TWO, data: value })
//               dispatch({ type: SELECTED_TYPE_TWO, data: true })
//               for (let i of state.typeOneDatas) {
//                 if (i.typeTwo === value) {
//                   for (let j = 0; j < i.typeTwoDatas.length; j++) {
//                     _typeThreeList.push({
//                       label: i.typeTwoDatas[j].typeThree,
//                       value: i.typeTwoDatas[j].typeThree
//                     })
//                   }
//                 }
//               }
//               dispatch({
//                 type: TYPE_THREE_LIST_PUSH_OPTIONS,
//                 data: _typeThreeList
//               })
//             }}
//           />}

//           <View className='step-1-text' onClick={() => {
//             dispatch({ type: SELECTED_TYPE_THREE, data: !state.isSelectedTypeThree })
//           }}>
//             <Text>3.请选择物品的三级分类：{state.typeThree}</Text>
//             {state.isSelectedTypeThree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
//           </View>
//           {state.isSelectedTypeThree ? null : (
//             <View>
//               {!state.isCustomTypeThree ? <AtRadio
//                 options={state.typeThreeList}
//                 value={state.typeThree}
//                 onClick={(value) => {
//                   dispatch({ type: SET_TYPE_THREE, data: value })
//                   dispatch({ type: SELECTED_TYPE_THREE, data: true })
//                 }}
//               /> : null}
//               <View className='custom-type-three'>
//                 {!state.isCustomTypeThree ? <View className='tip' onClick={() => { dispatch({ type: CUSTOM_TYPE_THREE }) }}>没有想要的?点击我自定义分类!</View> : null}
//                 {state.isCustomTypeThree ? <AtInput placeholder='在此输入物品的三级分类名'
//                   type='string'
//                   name='typeThreeInput'
//                   value={state.typeThree}
//                   onChange={(value) => {
//                     dispatch({ type: SET_TYPE_THREE, data: value })
//                   }}
//                   autoFocus
//                 ></AtInput> : null}
//               </View>
//             </View>
//           )}

//           <View className='step-1-text'>
//             <Text>4.请输入物品的具体名称以及型号信息：</Text>
//           </View>
//           <View className='name-input'>
//             <AtInput placeholder='在此输入物品的名称以及型号'
//               type='string'
//               name='nameInput'
//               value={state.nameInput}
//               onChange={(value) => {
//                 dispatch({ type: SET_NAME_INPUT, data: value })
//               }}
//             ></AtInput>
//           </View>
//           <AtButton
//             circle
//             type='primary'
//             onClick={() => { dispatch({ type: SET_CURRENT, data: state.current + 1 }) }}
//             full
//           >下一步</AtButton>
//         </View> : null}
//         {state.current === 1 ? <View className='step-2'>
//           <View className='step-2-text'>
//             <Text>5.请选择物品的数量：</Text>
//             <AtInputNumber
//               type='number'
//               min={1}
//               max={99}
//               step={1}
//               value={state.goodsNumber}
//               onChange={(value) => { dispatch({ type: SET_GOODS_NUMBER, data: value }) }}
//             />
//           </View>

//           <View className='step-2-text' onClick={() => {
//             dispatch({ type: SELECTED_DEGREE, data: !state.isSelectedDegree })
//           }}>
//             <Text>6.请选择物品的新旧程度：{mapNewAndOldDegree[state.newAndOldDegree]}</Text>
//             {state.isSelectedDegree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
//           </View>
//           {state.isSelectedDegree ? null :
//             <AtRadio
//               options={[
//                 { label: '全新', value: '100' },
//                 { label: '99新', value: '99' },
//                 { label: '98新', value: '98' },
//                 { label: '95新', value: '95' },
//                 { label: '90新', value: '90' },
//                 { label: '85新', value: '85' },
//                 { label: '80新', value: '80' },
//                 { label: '75新', value: '75' },
//                 { label: '70新', value: '70' },
//                 { label: '60新', value: '60' },
//                 { label: '半新', value: '50' },
//                 { label: '很旧', value: '30' },
//                 { label: '伊拉克', value: '10' },
//               ]}
//               value={state.newAndOldDegree}
//               onClick={(value) => {
//                 dispatch({ type: SET_NEW_AND_OLD_DEGREE, data: value })
//                 dispatch({ type: SELECTED_DEGREE, data: true })
//               }}
//             />}

//           <View className='step-2-text'>
//             <Text>7.请选择物品的交易方式：</Text>
//           </View>
//           <AtRadio
//             options={[
//               { label: '直接卖', value: 'directSale' },
//               { label: '等价换', value: 'directExchange' },
//               { label: '差价换', value: 'priceDifference' },
//             ]}
//             value={state.mode}
//             onClick={(mode) => {
//               dispatch({ type: SET_MODE, data: mode })
//             }}
//           />
//           {state.mode === 'directSale' ? <View className='direct-sale'>
//             <View className='mode-text'>您想要卖的价格是(元)：</View>
//             <AtInput placeholder='在此输入您想要卖的价格'
//               type='digit'
//               name='parForMePrice'
//               value={state.payForMePrice}
//               onChange={(value) => {
//                 dispatch({ type: SET_PAY_FOR_ME_PRICE, data: value })
//               }}
//             ></AtInput>
//           </View> : null}

//           {state.mode === 'directExchange' ? <View className='direct-exchange'>
//             <View className='mode-text'>您想要换的物品是：</View>
//             <AtInput placeholder='在此输入您想要换的物品的名称'
//               type='string'
//               name='wantExchangeGoods'
//               value={state.wantExchangeGoods}
//               onChange={(value) => {
//                 dispatch({ type: SET_WANT_EXCHANGE_GOODS, data: value })
//               }}
//             ></AtInput>
//           </View> : null}

//           {state.mode === 'priceDifference' ? <View className='priceDifference'>
//             <View className='mode-text'>您想要差价换的物品是：</View>
//             <AtInput placeholder='在此输入您想要换的物品的名称'
//               type='string'
//               name='wantExchangeGoods'
//               value={state.wantExchangeGoods}
//               onChange={(value) => {
//                 dispatch({ type: SET_WANT_EXCHANGE_GOODS, data: value })
//               }}
//             ></AtInput>
//             <View className='mode-text'>换了上面物品后要补的差价是(元)：</View>
//             <AtRadio
//               options={[
//                 { label: 'TA向我支付', value: 'payForMe' },
//                 { label: '我向TA支付', value: 'payForOther' },
//               ]}
//               value={state.objectOfPayment}
//               onClick={(value) => {
//                 dispatch({ type: SET_OBJECT_OF_PAYMENT, data: value })
//               }}
//             />
//             {state.objectOfPayment === 'payForMe' ? <AtInput placeholder='在此输入差价'
//               type='digit'
//               name='parForMePrice'
//               value={state.payForMePrice}
//               title='差价:'
//               onChange={(value) => {
//                 dispatch({ type: SET_PAY_FOR_ME_PRICE, data: value })
//               }}
//             ></AtInput> : null}
//             {state.objectOfPayment === 'payForOther' ? <AtInput placeholder='在此输入差价'
//               type='digit'
//               name='payForOtherPrice'
//               value={state.payForOtherPrice}
//               title='需要补的差价'
//               onChange={(value) => {
//                 dispatch({ type: SET_PAY_FOR_OTHER_PRICE, data: value })
//               }}
//             ></AtInput> : null}
//           </View> : null}
//           <AtButton
//             circle
//             type='primary'
//             onClick={() => { dispatch({ type: SET_CURRENT, data: state.current + 1 }) }}
//           >下一步</AtButton>
//         </View> : null}
//         {state.current === 2 ? <View className='step-3'>
//           <View className='step-3-text'>
//             <Text>8.请填写您发布的物品的详细描述：</Text>
//           </View>
//           <AtTextarea
//             value={state.describe}
//             onChange={(event: any) => { dispatch({ type: SET_DESCRIBE, data: event.target.value }) }}
//             maxLength={200}
//             placeholder='请您输入对物品的详细描述！'
//             height={300}
//           />
//           <View className='step-3-text'>
//             <Text>9.请选择您发布的物品的照片：</Text>
//           </View>
//           <AtImagePicker
//             files={state.files}
//             onChange={(files: any) => {
//               dispatch({ type: SET_FILES, data: files })
//             }}
//           />
//           <AtButton
//             circle
//             type='secondary'
//             onClick={() => {
//               Taro.login({
//                 success(loginResult) {
//                   const code = loginResult.code
//                   const orderId = productOrderId()
//                   const orderStatus=orderStatusObject.released
//                   let picsLocation = ''
//                   new Promise((resolve, reject) => {
//                     if (state.files.length > 0) {
//                       for (let i = 0; i < state.files.length; i++) {
//                         Taro.uploadFile({
//                           url: `${protocol}://${server}:${port}/releasegoodspics`,
//                           filePath: state.files[i].url,
//                           name: 'pic',
//                           header: {
//                             'Content-Type': 'multipart/form-data',
//                           },
//                           formData:{
//                             orderId:orderId
//                           },
//                           success(res) {
//                             const data = JSON.parse(res.data)
//                             if (res.statusCode === 200 && data.status === 'success') {
//                               picsLocation += `${data.location};`
//                               if (i === state.files.length - 1) {
//                                 resolve(picsLocation)
//                               }
//                             }
//                           },
//                           fail() {
//                             reject()
//                           }
//                         })
//                       }
//                     } else {
//                       resolve(picsLocation)
//                     }

//                   }).then((picsLocation) => {
//                     Taro.request({
//                       url: `${protocol}://${server}:${port}/releasegoods`,
//                       method: 'POST',
//                       data: {
//                         typeOne: state.typeOne,
//                         typeTwo: state.typeTwo,
//                         typeThree: state.typeThree,
//                         nameInput: state.nameInput,
//                         goodsNumber: state.goodsNumber,
//                         newAndOldDegree: state.newAndOldDegree,
//                         mode: state.mode,
//                         objectOfPayment: state.objectOfPayment,
//                         payForMePrice: state.payForMePrice,
//                         payForOtherPrice: state.payForOtherPrice,
//                         wantExchangeGoods: state.wantExchangeGoods,
//                         describe: state.describe,
//                         picsLocation: picsLocation,
//                         orderId: orderId,
//                         code: code,
//                         orderStatus:orderStatus
//                       },
//                       success(res) {
//                         if (res.statusCode === 200 && res.data.status === 'success') {
//                           dispatch({ type: RELEASED })
//                           setTimeout(() => {
//                             dispatch({ type: RESET })
//                             Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
//                             Taro.navigateTo({url:`/pages/goods-info/goods-info?orderId=${orderId}`})
//                           }, 1000)
//                         } else {
//                           dispatch({type:NOT_RELEASED})
//                         }
//                       }
//                     })
//                   })
//                 }
//               })
//             }}
//           >发布</AtButton>
//         </View> : null}
//         <AtToast isOpened={state.isRelease} text={state.isRelease?'发布成功':'发布失败！请检查后再提交！'} status={state.isRelease?'success':'error'} duration={1000}></AtToast>
//       </View>
//   )
// }

// export default Taro.memo(ReleaseGoodsSteps)


import Taro, { Component } from '@tarojs/taro'
import { ComponentClass } from 'react'
import promiseApi from '../../utils/promiseApi'
import { ClStep, ClButton, ClSelect, ClInput, ClRadio, ClMessage, ClTip, ClLoading, ClTitleBar } from "mp-colorui"
import { AtImagePicker, AtTextarea, AtInputNumber, AtInput, AtToast, AtRadio } from 'taro-ui'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import goodsTypeGridsDatas from '../../static-name/goods-sort'
import typeOneName from '../../static-name/type-one'
import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
import orderStatusObject from '../../static-name/order-status'
import productOrderId from '../../utils/productOrderId'
import { server, port, protocol } from '../../static-name/server'
import './index.scss'

type PageStateProps = {
}

type PageDispatchProps = {

}

type PageOwnProps = {
}

interface radioGroup {
  label: string;
  value: string;
}
interface Files {
  file: {
    path: string;
    size: number;
  };
  url: string;
}
type PageState = {
  step: number;
  typeTwoList: string[];
  typeThreeList: radioGroup[];
  typeOne: string;
  typeTwo: string;
  typeThree: string;
  isCustomTypeThree: boolean;
  // nameInput: string;
  goodsNumber: number;
  newAndOldDegree: string;
  selectedNewAndOldDegreeIndex: number;
  mode: string;
  // payForMePrice: number;
  // wantExchangeGoods: string;
  objectOfPayment: string;
  // payForOtherPrice: number;
  // describe: string;
  isRelease: boolean;
  isShowMessage: boolean;
  selectedTypeOneIndex: number;
  selectedTypeTwoIndex:number;
  commonContentLoading: boolean;
  isSlectedFiles: boolean;
  isFail: boolean;
  // files:Files[];
}
type MessageType = "success" | "error" | "warn" | "info" | "custom"
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReleaseGoodsSteps {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class ReleaseGoodsSteps extends Component {
  constructor(props) {
    super(props)
  }
  componentWillUpdate() {
    this.setState({ isShowMessage: false })
  }
  state = {
    step: 0,
    typeTwoList: ['iphone', '小米', '华为', 'oppo', 'vivo', '魅族'],
    typeThreeList: [
      { label: '11pro max', value: '11pro max' },
      { label: '11pro', value: '11pro' },
      { label: '11', value: '11' },
      { label: 'xs max', value: 'xs max' },
      { label: 'xs', value: 'xs' },
      { label: 'xr', value: 'xr' },
      { label: 'x', value: 'x' },
      { label: '8 plus', value: '8 plus' },
      { label: '8', value: '8' },
    ],
    selectedTypeOneIndex: 0,
    typeOne: '手机',
    typeTwo: 'iphone',
    typeThree: '',
    isCustomTypeThree: false,
    // nameInput: '',
    goodsNumber: 1,
    newAndOldDegree: '100',
    selectedNewAndOldDegreeIndex: 0,
    mode: '',
    // payForMePrice: 0,
    // wantExchangeGoods: '',
    objectOfPayment: 'payForMe',
    // payForOtherPrice: 0,
    // describe: '',
    isRelease: false,
    isFail: false,
    isShowMessage: false,
    commonContentLoading: false,
    isSlectedFiles: false,
    selectedTypeTwoIndex:0
  }
  nameInput = ''
  payForMePrice = 1
  payForOtherPrice = 0
  wantExchangeGoods = ''
  describe = ''
  files: Files[] = []
  message = ''
  messageType: MessageType = 'success'
  steps = [
    {
      title: '步骤1'
    }, {
      title: '步骤2'
    }, {
      title: '步骤3'
    }
  ]
  newAndOldDegreeMap = {
    '全新': '100',
    '99新': '99',
    '98新': '98',
    '95新': '95',
    '90新': '90',
    '85新': '85',
    '80新': '80',
    '75新': '75',
    '70新': '70',
    '60新': '60',
    '半新': '50',
    '很旧': '30',
    '伊拉克': '10'
  }
  newAndOldDegreeList = ['全新', '99新', '98新', '95新', '90新', '85新', '80新', '75新', '70新', '60新', '半新', '很旧', '伊拉克']
  modeList = [
    { label: '直接卖', value: 'directSale' },
    { label: '等价换', value: 'directExchange' },
    { label: '差价换', value: 'priceDifference' },
  ]
  payForList = [
    { label: 'TA向我支付', value: 'payForMe' },
    { label: '我向TA支付', value: 'payForOther' },
  ]
  onColumnChange(e) {
    const { column, value } = e
    if (column === 0) {
      const typeOneDatas = goodsTypeGridsDatas[value].typeOneDatas
      const _typeTwoList: string[] = []
      for (let i = 0; i < typeOneDatas.length; i++) {
        _typeTwoList.push(typeOneDatas[i].typeTwo)
      }
      this.setState({
        selectedTypeOneIndex: value,
        typeTwoList: _typeTwoList,
      })
    }
    if(column ===1){
      this.setState({selectedTypeTwoIndex:value})
    }
  }
  onChange(e) {
    const [col1, col2] = e
    const typeTwoDatas = goodsTypeGridsDatas[col1].typeOneDatas[col2].typeTwoDatas
    const _typeThreeList: radioGroup[] = []
    for (let i = 0; i < typeTwoDatas.length; i++) {
      _typeThreeList.push({ label: typeTwoDatas[i].typeThree, value: typeTwoDatas[i].typeThree })
    }
    this.setState((prevState: PageState) => {
      return {
        typeThreeList: _typeThreeList,
        typeOne: typeOneName[col1],
        typeTwo: prevState.typeTwoList[col2]
      }
    })
  }
  onTypeThreeChange(value) {
    this.setState({ typeThree: value })
  }
  onCustomSortChange(value) {
    this.setState({ typeThree: value })
  }
  onNameInputChange(value) {
    this.nameInput = value
    // this.setState({ nameInput: value })
  }
  onStepOneClick() {
    const { typeOne, typeTwo, typeThree } = this.state
    Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
    // console.log(typeOne, typeTwo, typeThree, this.nameInput);
    if (typeOne && typeTwo && typeThree && this.nameInput) {
      this.setState((prevState: PageState) => {
        return {
          step: prevState.step + 1,
          isShowMessage: false,
        }
      })
    } else {
      this.message = '有选项没有填写,请填写后再点下一步！'
      this.messageType = 'error'
      this.setState({ isShowMessage: true })
    }
  }
  onGoodsNumberChange(value) {
    this.setState({ goodsNumber: value })
  }
  onClickPrevStep() {
    this.setState((prevState: PageState) => {
      return {
        step: prevState.step - 1,
      }
    })
  }
  onNewAndOldDegreeChange(e) {
    const selectedName = this.newAndOldDegreeList[e]
    this.setState({
      newAndOldDegree: this.newAndOldDegreeMap[selectedName],
      selectedNewAndOldDegreeIndex: e
    })
  }
  onModeChange(value) {
    this.setState({ mode: value })
  }
  onDirectSaleChange(value) {
    this.payForMePrice = value
    // this.setState({ payForMePrice: value })
  }
  onDirectExchangeChange(value) {
    this.wantExchangeGoods = value
    // this.setState({ wantExchangeGoods: value })
  }
  onPayForChange(value) {
    this.setState({ objectOfPayment: value })
  }
  onPayForOtherChange(value) {
    this.payForOtherPrice = value
    // this.setState({ payForOtherPrice: value })
  }
  onStepTwoClick() {
    const { goodsNumber, newAndOldDegree, mode, objectOfPayment } = this.state
    // console.log(goodsNumber, newAndOldDegree, mode, objectOfPayment);
    Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
    if (goodsNumber && newAndOldDegree && mode && objectOfPayment) {
      this.setState((prevState: PageState) => {
        return {
          step: prevState.step + 1,
          isShowMessage: false
        }
      })
    } else {
      this.message = '有选项没有填写,请填写后再点下一步！'
      this.messageType = 'error'
      this.setState({ isShowMessage: true })
    }
  }
  onDescribeChange(value) {
    this.describe = value
    // this.setState({ describe: value })
  }
  onFilesChange(value) {
    this.setState({ isSlectedFiles: true })
    this.files = value
  }
  onReleasedClick() {
    this.setState((prevState: PageState) => {
      return {
        step: prevState.step + 1,
        commonContentLoading: true
      }
    })
    Taro.login({
      success: (loginResult) => {
        const code = loginResult.code
        const orderId = productOrderId()
        const orderStatus = orderStatusObject.released
        let picsLocation = ''
        let rate = 0
        new Promise((resolve, reject) => {
          if (this.files.length > 0) {
            for (let i = 0; i < this.files.length; i++) {
              Taro.uploadFile({
                url: `${protocol}://${server}:${port}/releasegoodspics`,
                filePath: this.files[i].url,
                name: 'pic',
                header: {
                  'Content-Type': 'multipart/form-data',
                },
                formData: {
                  orderId: orderId
                },
                success: (res) => {
                  const data = JSON.parse(res.data)
                  if (res.statusCode === 200 && data.status === 'success') {
                    picsLocation += `${data.location};`
                    if (rate === this.files.length - 1) {
                      resolve(picsLocation)
                    }
                    rate = rate + 1
                  }
                },
                fail() {
                  reject()
                }
              })
            }
          } else {
            resolve(picsLocation)
          }

        }).then((picsLocation) => {
          Taro.request({
            url: `${protocol}://${server}:${port}/releasegoods`,
            method: 'POST',
            data: {
              typeOne: this.state.typeOne,
              typeTwo: this.state.typeTwo,
              typeThree: this.state.typeThree,
              nameInput: this.nameInput,
              goodsNumber: this.state.goodsNumber,
              newAndOldDegree: this.state.newAndOldDegree,
              mode: this.state.mode,
              objectOfPayment: this.state.objectOfPayment,
              payForMePrice: this.payForMePrice,
              payForOtherPrice: this.payForOtherPrice,
              wantExchangeGoods: this.wantExchangeGoods,
              describe: this.describe,
              picsLocation: picsLocation,
              orderId: orderId,
              code: code,
              orderStatus: orderStatus
            },
            success: (res) => {
              if (res.statusCode === 200 && res.data.status === 'success') {
                let timer0 = setTimeout(() => {
                  this.setState({
                    step: 0,
                    typeTwoList: ['iphone', '小米', '华为', 'oppo', 'vivo', '魅族'],
                    typeThreeList: [
                      { label: '11pro max', value: '11pro max' },
                      { label: '11pro', value: '11pro' },
                      { label: '11', value: '11' },
                      { label: 'xs max', value: 'xs max' },
                      { label: 'xs', value: 'xs' },
                      { label: 'xr', value: 'xr' },
                      { label: 'x', value: 'x' },
                      { label: '8 plus', value: '8 plus' },
                      { label: '8', value: '8' },
                    ],
                    selectedTypeOneIndex: 0,
                    typeOne: '手机',
                    typeTwo: 'iphone',
                    typeThree: '',
                    isCustomTypeThree: false,
                    goodsNumber: 1,
                    newAndOldDegree: '100',
                    mode: '',
                    objectOfPayment: 'payForMe',
                    isRelease: true,
                    isFail: false,
                    isShowMessage: false,
                    commonContentLoading: false,
                    isSlectedFiles: false,
                    selectedNewAndOldDegreeIndex: 0,
                    selectedTypeTwoIndex:0
                  })
                  this.nameInput = ''
                  this.payForMePrice = 1
                  this.payForOtherPrice = 0
                  this.wantExchangeGoods = ''
                  this.describe = ''
                  this.files = []
                }, 2000, () => {
                  clearTimeout(timer0)
                })
                let timer = setTimeout(() => {
                  this.setState({ isRelease: false })
                  Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
                  Taro.navigateTo({ url: `/pages/goods-info/goods-info?orderId=${orderId}` })
                }, 3000, () => {
                  clearTimeout(timer)
                })
              } else {
                this.setState({ isFail: true })
              }
            }
          })
        })
      }
    })
  }
  render() {
    const muti = [typeOneName, this.state.typeTwoList];
    return (
      <View className='release-goods-steps'>
        <ClStep steps={this.steps} type='line' step={this.state.step} activeColor='green' />
        <ClMessage
          message={this.message}
          show={this.state.isShowMessage}
          type={this.messageType}
        />
        {this.state.step === 0 ? (
          <View className='step'>
            <ClTitleBar bgColor='gradualOrange' title='请选择一、分类二级:' textColor='white' borderColor='white' type='border-title' />
            <ClSelect
              multiSelector={{
                range: muti,
                value: [this.state.selectedTypeOneIndex, this.state.selectedTypeTwoIndex]
              }}
              mode="multiSelector"
              title="一、二级分类："
              onChange={(e) => { this.onChange(e) }}
              onColumnChange={(e) => { this.onColumnChange(e) }}
              style={{
                boxShadow: '0 0 10px #777'
              }}
            />
            <ClTitleBar bgColor='gradualOrange' title='请选择三级分类:' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            {!this.state.isCustomTypeThree ? <AtRadio
              options={this.state.typeThreeList}
              value={this.state.typeThree}
              onClick={(value) => {
                this.onTypeThreeChange(value)
              }}
            /> : null}
            {!this.state.isCustomTypeThree ? <View className='tip' onClick={() => {
              this.setState((prevState: PageState) => {
                return { isCustomTypeThree: true }
              })
            }}>没有想要的?点击我自定义分类!</View> : null}

            {this.state.isCustomTypeThree ? <AtInput placeholder='在此输入物品的三级分类名'
              type='string'
              name='typeThreeInput'
              value={this.state.typeThree}
              onChange={(value) => {
                this.onCustomSortChange(value)
              }}
            ></AtInput> : null}
            {this.state.isCustomTypeThree ? <View className='tip' onClick={() => {
              this.setState((prevState: PageState) => {
                return { isCustomTypeThree: false }
              })
            }}>点我恢复推荐三级分类！</View> : null}
            <ClTitleBar bgColor='gradualOrange' title='请输入具体名称、型号:' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            <ClInput
              placeholder="请输入具体名称、型号"
              type="text"
              style={{
                boxShadow: '0 0 10px #777'
              }}
              defaultValue={this.nameInput}
              onChange={(value) => { this.onNameInputChange(value) }}
            />
            <ClButton shape='round' bgColor='gradualOrange'
              long
              onClick={() => {
                this.onStepOneClick()
              }}
              size='large'
              style={{ marginTop: '20px' }}
            >下一步</ClButton>
          </View>) : null}

        {this.state.step === 1 ? (
          <View className='step'>
            <ClTitleBar bgColor='gradualOrange' title='请选择物品的数量：' textColor='white' borderColor='white' type='border-title' />
            <View className='goods-number'>
              <Text className='num'>数量：</Text>
              <AtInputNumber
                type='number'
                min={1}
                max={99}
                step={1}
                value={this.state.goodsNumber}
                onChange={(value) => { this.onGoodsNumberChange(value) }}
              />
            </View>
            <ClTitleBar bgColor='gradualOrange' title='请选择物品的新旧程度：' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            <ClSelect
              selector={{
                range: this.newAndOldDegreeList,
                value: this.state.selectedNewAndOldDegreeIndex
              }}
              mode="selector"
              title="新旧程度："
              onChange={(e) => { this.onNewAndOldDegreeChange(e) }}
              style={{
                boxShadow: '0 0 10px #777'
              }}
            />
            {/* <AtRadio
              options={this.newAndOldDegreeList}
              value={this.state.newAndOldDegree}
              onClick={(value) => {
                this.onNewAndOldDegreeChange(value) 
              }}
            /> */}

            <ClTitleBar bgColor='gradualOrange' title='请选择交易方式：' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            <AtRadio
              options={this.modeList}
              value={this.state.mode}
              onClick={(value) => {
                this.onModeChange(value)
              }}
            />
            {this.state.mode === 'directSale' ? (
              <View>
                <View className='mode-text'>您想要卖的价格(元):</View>
                <AtInput placeholder='在此输入您想要卖的价格'
                  type='number'
                  name='parForMePrice'
                  value={this.payForMePrice}
                  onChange={(value) => {
                    this.onDirectSaleChange(value)
                  }}
                ></AtInput>
              </View>
            ) : null}
            {this.state.mode === 'directExchange' ? (
              <View>
                <View className='mode-text'>您想要换的商品:</View>
                <AtInput placeholder='在此输入您想要换的物品的名称'
                  type='string'
                  name='wantExchangeGoods'
                  value={this.wantExchangeGoods}
                  onChange={(value) => {
                    this.onDirectExchangeChange(value)
                  }}
                ></AtInput>
              </View>
            ) : null}

            {this.state.mode === 'priceDifference' ? (
              <View>
                <View className='mode-text'>您想要换的商品:</View>
                <AtInput placeholder='在此输入您想要换的物品'
                  type='string'
                  name='wantExchangeGoods'
                  value={this.wantExchangeGoods}
                  onChange={(value) => {
                    this.onDirectExchangeChange(value)
                  }}
                ></AtInput>
                <View className='mode-text'>换了上面物品后要补的差价是(元)：</View>
                <AtRadio
                  options={this.payForList}
                  value={this.state.objectOfPayment}
                  onClick={(value) => {
                      this.onPayForChange(value)
                  }
                  }
                />
                {this.state.objectOfPayment === 'payForMe' ?
                  <View>
                    <View className='mode-text'>对方向我支付的差价:</View>
                    <AtInput placeholder='在此输入差价'
                      type='digit'
                      name='parForMePrice'
                      value={this.payForMePrice}
                      onChange={(value) => {
                        this.onDirectSaleChange(value)
                      }}
                    ></AtInput>
                  </View>
                  : null}
                {this.state.objectOfPayment === 'payForOther' ?
                  <View>
                    <View className='mode-text'>我需要补的差价:</View>
                    <AtInput placeholder='在此输入差价'
                      type='digit'
                      name='payForOtherPrice'
                      value={this.payForOtherPrice}
                      onChange={(value) => {
                        this.onPayForOtherChange(value)
                      }}
                    ></AtInput>
                  </View>
                  : null}
              </View>

            ) : null}

            <View className='btn'>
              <ClButton shape='round' bgColor='gradualBlue'
                onClick={() => {
                  this.onClickPrevStep()
                }}
                size='large'
                style={{ marginTop: '20px' }}
              >上一步</ClButton>
              <ClButton shape='round' bgColor='gradualOrange'
                onClick={() => {
                  this.onStepTwoClick()
                }}
                size='large'
                style={{ marginTop: '20px' }}
              >下一步</ClButton>
            </View>
          </View>) : null}

        {(this.state.step === 2 || this.state.step === 3) ? (
          <View>
            <ClLoading
              type="modal"
              show={this.state.commonContentLoading}
              modalText="商品上传中..."
            ></ClLoading>
            <ClTitleBar bgColor='gradualOrange' title='请填写您发布的物品的详细描述：' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            <AtTextarea
              value={this.describe}
              onChange={(event: any) => { this.onDescribeChange(event.detail.value) }}
              maxLength={200}
              placeholder='请您输入对物品的详细描述！'
              height={300}
            />
            <ClTitleBar bgColor='gradualOrange' title='请选择商品的图片描述：' textColor='white' borderColor='white' type='border-title' style={{ marginTop: '20px' }} />
            <View className='image-picker'>
              <AtImagePicker
                files={this.files}
                onChange={(files: any) => {
                  this.onFilesChange(files)
                }}
              />
            </View>
            <View className='btn'>
              <ClButton shape='round' bgColor='gradualBlue'
                onClick={() => {
                  this.onClickPrevStep()
                }}
                size='large'
                style={{ marginTop: '20px' }}
              >上一步</ClButton>
              <ClButton shape='round' bgColor='gradualOrange'
                onClick={() => {
                  this.onReleasedClick()
                }}
                size='large'
                style={{ marginTop: '20px' }}
              >发布商品</ClButton>
            </View>
          </View>) : null}
        <AtToast isOpened={this.state.isRelease} text={'发布成功'} status={'success'} duration={1000}></AtToast>
        <AtToast isOpened={this.state.isFail} text={'发布失败！请检查后再提交！'} status={'error'} duration={1000}></AtToast>
      </View>
    )
  }
}
export default ReleaseGoodsSteps as ComponentClass<PageOwnProps, PageState>