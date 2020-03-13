import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtSteps, AtRadio, AtImagePicker, AtTextarea, AtInput, AtButton, AtInputNumber, AtToast } from 'taro-ui'
import goodsTypeGridsDatas from '../../static-name/goods-sort'
import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
import { CDNWebSite } from '../../static-name/web-site'
import { server, port,protocol } from '../../static-name/server'
import productOrderId from '../../utils/productOrderId'
import orderStatusObject from '../../static-name/order-status'
import Skeleton from 'taro-skeleton'
import './index.scss'
interface TypeAtRadioOptionsList {
  label: string;
  value: string;
}
interface TypeTwoDatas {
  typeThree: string;
  imageSrc: string;
}
interface TypeTwo {
  typeTwo: string;
  trademark: string;
  typeTwoDatas: TypeTwoDatas[];
}
interface InitState {
  typeOneList: TypeAtRadioOptionsList[];
  typeTwoList: TypeAtRadioOptionsList[];
  typeThreeList: TypeAtRadioOptionsList[];
  typeOneDatas: TypeTwo[],
  loading: boolean;
  current: number;
  typeOne: string;
  isSelectedTypeOne: boolean;
  typeTwo: string;
  isSelectedTypeTwo: boolean;
  typeThree: string;
  isSelectedTypeThree: boolean;
  isCustomTypeThree: boolean;
  nameInput: string;
  goodsNumber: number;
  newAndOldDegree: string;
  isSelectedDegree: boolean;
  mode: string;
  payForMePrice: number;
  wantExchangeGoods: string;
  objectOfPayment: string;
  payForOtherPrice: number;
  describe: string;
  files: Array<any>;
  isRelease: boolean;
}

const TYPE_ONE_LIST_PUSH_OPTIONS = 'TYPE_ONE_LIST_PUSH_OPTIONS'
const TYPE_TWO_LIST_PUSH_OPTIONS = 'TYPE_TWO_LIST_PUSH_OPTIONS'
const TYPE_THREE_LIST_PUSH_OPTIONS = 'TYPE_THREE_LIST_PUSH_OPTIONS'
const RECORD_TYPE_ONE_DATAS = 'RECORD_TYPE_ONE_DATAS'
const LOADING_SUCCESS = 'LOADING_SUCCESS'
const SET_CURRENT = 'SET_CURRENT'
const SET_TYPE_ONE = 'SET_TYPE_ONE'
const SELECTED_TYPE_ONE = 'SELECTED_TYPE_ONE'
const SET_TYPE_TWO = 'SET_TYPE_TWO'
const SELECTED_TYPE_TWO = 'SELECTED_TYPE_TWO'
const SET_TYPE_THREE = 'SET_TYPE_THREE'
const SELECTED_TYPE_THREE = 'SELECTED_TYPE_THREE'
const CUSTOM_TYPE_THREE = 'CUSTOM_TYPE_THREE'
const SET_NAME_INPUT = 'SET_NAME_INPUT'
const SET_GOODS_NUMBER = 'SET_GOODS_NUMBER'
const SET_NEW_AND_OLD_DEGREE = 'SET_NEW_AND_OLD_DEGREE'
const SELECTED_DEGREE = 'SELECTED_DEGREE'
const SET_MODE = 'SET_MODE'
const SET_PAY_FOR_ME_PRICE = 'SET_PAY_FOR_ME_PRICE'
const SET_WANT_EXCHANGE_GOODS = 'SET_WANT_EXCHANGE_GOODS'
const SET_OBJECT_OF_PAYMENT = 'SET_OBJECT_OF_PAYMENT'
const SET_PAY_FOR_OTHER_PRICE = 'SET_PAY_FOR_OTHER_PRICE'
const SET_DESCRIBE = 'SET_DESCRIBE'
const SET_FILES = 'SET_FILES'
const RELEASED = 'RELEASED'
const NOT_RELEASED = 'NOT_RELEASED'
const RESET = 'RESET'

const initState: InitState = {
  typeOneList: [],
  typeTwoList: [],
  typeThreeList: [],
  typeOneDatas: [],
  loading: true,
  current: 0,
  typeOne: '',
  isSelectedTypeOne: false,
  typeTwo: '',
  isSelectedTypeTwo: false,
  typeThree: '',
  isSelectedTypeThree: false,
  isCustomTypeThree: false,
  nameInput: '',
  goodsNumber: 1,
  newAndOldDegree: '',
  isSelectedDegree: false,
  mode: '',
  payForMePrice: 0,
  wantExchangeGoods: '',
  objectOfPayment: 'payForMe',
  payForOtherPrice: 0,
  describe: '',
  files: [],
  isRelease: false,
}
function reducer(state = initState, action) {
  switch (action.type) {
    case TYPE_ONE_LIST_PUSH_OPTIONS:
      return Object.assign({}, state, { typeOneList: action.data })
    case TYPE_TWO_LIST_PUSH_OPTIONS:
      return Object.assign({}, state, { typeTwoList: action.data })
    case TYPE_THREE_LIST_PUSH_OPTIONS:
      return Object.assign({}, state, { typeThreeList: action.data })
    case RECORD_TYPE_ONE_DATAS:
      return Object.assign({}, state, { typeOneDatas: action.data })
    case LOADING_SUCCESS:
      return Object.assign({}, state, { loading: false })
    case SET_CURRENT:
      return Object.assign({}, state, { current: action.data })
    case SET_TYPE_ONE:
      return Object.assign({}, state, { typeOne: action.data })
    case SELECTED_TYPE_ONE:
      return Object.assign({}, state, { isSelectedTypeOne: action.data })
    case SET_TYPE_TWO:
      return Object.assign({}, state, { typeTwo: action.data })
    case SELECTED_TYPE_TWO:
      return Object.assign({}, state, { isSelectedTypeTwo: action.data })
    case SET_TYPE_THREE:
      return Object.assign({}, state, { typeThree: action.data })
    case SELECTED_TYPE_THREE:
      return Object.assign({}, state, { isSelectedTypeThree: action.data })
    case CUSTOM_TYPE_THREE:
      return Object.assign({}, state, { isCustomTypeThree: true })
    case SET_NAME_INPUT:
      return Object.assign({}, state, { nameInput: action.data })
    case SET_GOODS_NUMBER:
      return Object.assign({}, state, { goodsNumber: action.data })
    case SET_NEW_AND_OLD_DEGREE:
      return Object.assign({}, state, { newAndOldDegree: action.data })
    case SELECTED_DEGREE:
      return Object.assign({}, state, { isSelectedDegree: action.data })
    case SET_MODE:
      return Object.assign({}, state, { mode: action.data })
    case SET_PAY_FOR_ME_PRICE:
      return Object.assign({}, state, { payForMePrice: action.data })
    case SET_WANT_EXCHANGE_GOODS:
      return Object.assign({}, state, { wantExchangeGoods: action.data })
    case SET_OBJECT_OF_PAYMENT:
      return Object.assign(state, { objectOfPayment: action.data })
    case SET_PAY_FOR_OTHER_PRICE:
      return Object.assign({}, state, { payForOtherPrice: action.data })
    case SET_DESCRIBE:
      return Object.assign({}, state, { describe: action.data })
    case SET_FILES:
      return Object.assign({}, state, { files: action.data })
    case RELEASED:
      return Object.assign({}, state, { isRelease: true })
    case NOT_RELEASED:
      return Object.assign({}, state, { isRelease: false })
    case RESET:
      return Object.assign({}, initState, { loading: false, isRelease: false })
    default:
      return state
  }
}
function ReleaseGoodsSteps() {
  const [state, dispatch] = useReducer(reducer, initState);
  let _typeOneList: TypeAtRadioOptionsList[] = []
  let _typeTwoList: TypeAtRadioOptionsList[] = []
  let _typeThreeList: TypeAtRadioOptionsList[] = []
  useEffect(() => {
    for (let i of goodsTypeGridsDatas) {
      _typeOneList.push({ label: i.typeOne, value: i.typeOne })
    }
    dispatch({ type: TYPE_ONE_LIST_PUSH_OPTIONS, data: _typeOneList })
  }, [_typeOneList])
  const items = [
    {
      'title': '步骤一',
      'desc': '请您选择物品的分类以及名称信息',
      'success': true
    },
    {
      'title': '步骤二',
      'desc': '请您填写物品的数量、新旧、价格以及交易形式'
    },
    {
      'title': '步骤三',
      'desc': '请您上传物品的图片以及描述信息',
    }
  ]
  return (
      <View className='release-goods-steps'>
        <AtSteps
          items={items}
          current={state.current}
          onChange={(current) => { dispatch({ type: SET_CURRENT, data: current }) }}
        />
        {state.current === 0 ? <View className='step-1'>
          <View className='step-1-text' onClick={() => {
            dispatch({ type: SELECTED_TYPE_ONE, data: !state.isSelectedTypeOne })
          }}>
            <Text>1.请选择物品的一级分类：{state.typeOne}</Text>
            {state.isSelectedTypeOne ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {state.isSelectedTypeOne ? null :
            <AtRadio
              options={state.typeOneList}
              value={state.typeOne}
              onClick={(value) => {
                dispatch({ type: SET_TYPE_ONE, data: value })
                dispatch({ type: SELECTED_TYPE_ONE, data: true })
                for (let i of goodsTypeGridsDatas) {
                  if (i.typeOne === value) {
                    for (let j = 0; j < i.typeOneDatas.length; j++) {
                      _typeTwoList.push({
                        label: i.typeOneDatas[j].typeTwo,
                        value: i.typeOneDatas[j].typeTwo
                      })
                    }
                    dispatch({ type: RECORD_TYPE_ONE_DATAS, data: i.typeOneDatas })
                  }
                }
                dispatch({
                  type: TYPE_TWO_LIST_PUSH_OPTIONS,
                  data: _typeTwoList
                })
              }}
            />}

          <View className='step-1-text' onClick={() => {
            dispatch({ type: SELECTED_TYPE_TWO, data: !state.isSelectedTypeTwo })
          }}>
            <Text>2.请选择物品的二级分类：{state.typeTwo}</Text>
            {state.isSelectedTypeTwo ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {state.isSelectedTypeTwo ? null : <AtRadio
            options={state.typeTwoList}
            value={state.typeTwo}
            onClick={(value) => {
              dispatch({ type: SET_TYPE_TWO, data: value })
              dispatch({ type: SELECTED_TYPE_TWO, data: true })
              for (let i of state.typeOneDatas) {
                if (i.typeTwo === value) {
                  for (let j = 0; j < i.typeTwoDatas.length; j++) {
                    _typeThreeList.push({
                      label: i.typeTwoDatas[j].typeThree,
                      value: i.typeTwoDatas[j].typeThree
                    })
                  }
                }
              }
              dispatch({
                type: TYPE_THREE_LIST_PUSH_OPTIONS,
                data: _typeThreeList
              })
            }}
          />}

          <View className='step-1-text' onClick={() => {
            dispatch({ type: SELECTED_TYPE_THREE, data: !state.isSelectedTypeThree })
          }}>
            <Text>3.请选择物品的三级分类：{state.typeThree}</Text>
            {state.isSelectedTypeThree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {state.isSelectedTypeThree ? null : (
            <View>
              {!state.isCustomTypeThree ? <AtRadio
                options={state.typeThreeList}
                value={state.typeThree}
                onClick={(value) => {
                  dispatch({ type: SET_TYPE_THREE, data: value })
                  dispatch({ type: SELECTED_TYPE_THREE, data: true })
                }}
              /> : null}
              <View className='custom-type-three'>
                {!state.isCustomTypeThree ? <View className='tip' onClick={() => { dispatch({ type: CUSTOM_TYPE_THREE }) }}>没有想要的?点击我自定义分类!</View> : null}
                {state.isCustomTypeThree ? <AtInput placeholder='在此输入物品的三级分类名'
                  type='string'
                  name='typeThreeInput'
                  value={state.typeThree}
                  onChange={(value) => {
                    dispatch({ type: SET_TYPE_THREE, data: value })
                  }}
                  autoFocus
                ></AtInput> : null}
              </View>
            </View>
          )}

          <View className='step-1-text'>
            <Text>4.请输入物品的具体名称以及型号信息：</Text>
          </View>
          <View className='name-input'>
            <AtInput placeholder='在此输入物品的名称以及型号'
              type='string'
              name='nameInput'
              value={state.nameInput}
              onChange={(value) => {
                dispatch({ type: SET_NAME_INPUT, data: value })
              }}
            ></AtInput>
          </View>
          <AtButton
            circle
            type='primary'
            onClick={() => { dispatch({ type: SET_CURRENT, data: state.current + 1 }) }}
            full
          >下一步</AtButton>
        </View> : null}
        {state.current === 1 ? <View className='step-2'>
          <View className='step-2-text'>
            <Text>5.请选择物品的数量：</Text>
            <AtInputNumber
              type='number'
              min={1}
              max={99}
              step={1}
              value={state.goodsNumber}
              onChange={(value) => { dispatch({ type: SET_GOODS_NUMBER, data: value }) }}
            />
          </View>

          <View className='step-2-text' onClick={() => {
            dispatch({ type: SELECTED_DEGREE, data: !state.isSelectedDegree })
          }}>
            <Text>6.请选择物品的新旧程度：{mapNewAndOldDegree[state.newAndOldDegree]}</Text>
            {state.isSelectedDegree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {state.isSelectedDegree ? null :
            <AtRadio
              options={[
                { label: '全新', value: '100' },
                { label: '99新', value: '99' },
                { label: '98新', value: '98' },
                { label: '95新', value: '95' },
                { label: '90新', value: '90' },
                { label: '85新', value: '85' },
                { label: '80新', value: '80' },
                { label: '75新', value: '75' },
                { label: '70新', value: '70' },
                { label: '60新', value: '60' },
                { label: '半新', value: '50' },
                { label: '很旧', value: '30' },
                { label: '伊拉克', value: '10' },
              ]}
              value={state.newAndOldDegree}
              onClick={(value) => {
                dispatch({ type: SET_NEW_AND_OLD_DEGREE, data: value })
                dispatch({ type: SELECTED_DEGREE, data: true })
              }}
            />}

          <View className='step-2-text'>
            <Text>7.请选择物品的交易方式：</Text>
          </View>
          <AtRadio
            options={[
              { label: '直接卖', value: 'directSale' },
              { label: '等价换', value: 'directExchange' },
              { label: '差价换', value: 'priceDifference' },
            ]}
            value={state.mode}
            onClick={(mode) => {
              dispatch({ type: SET_MODE, data: mode })
            }}
          />
          {state.mode === 'directSale' ? <View className='direct-sale'>
            <View className='mode-text'>您想要卖的价格是(元)：</View>
            <AtInput placeholder='在此输入您想要卖的价格'
              type='digit'
              name='parForMePrice'
              value={state.payForMePrice}
              onChange={(value) => {
                dispatch({ type: SET_PAY_FOR_ME_PRICE, data: value })
              }}
            ></AtInput>
          </View> : null}

          {state.mode === 'directExchange' ? <View className='direct-exchange'>
            <View className='mode-text'>您想要换的物品是：</View>
            <AtInput placeholder='在此输入您想要换的物品的名称'
              type='string'
              name='wantExchangeGoods'
              value={state.wantExchangeGoods}
              onChange={(value) => {
                dispatch({ type: SET_WANT_EXCHANGE_GOODS, data: value })
              }}
            ></AtInput>
          </View> : null}

          {state.mode === 'priceDifference' ? <View className='priceDifference'>
            <View className='mode-text'>您想要差价换的物品是：</View>
            <AtInput placeholder='在此输入您想要换的物品的名称'
              type='string'
              name='wantExchangeGoods'
              value={state.wantExchangeGoods}
              onChange={(value) => {
                dispatch({ type: SET_WANT_EXCHANGE_GOODS, data: value })
              }}
            ></AtInput>
            <View className='mode-text'>换了上面物品后要补的差价是(元)：</View>
            <AtRadio
              options={[
                { label: 'TA向我支付', value: 'payForMe' },
                { label: '我向TA支付', value: 'payForOther' },
              ]}
              value={state.objectOfPayment}
              onClick={(value) => {
                dispatch({ type: SET_OBJECT_OF_PAYMENT, data: value })
              }}
            />
            {state.objectOfPayment === 'payForMe' ? <AtInput placeholder='在此输入差价'
              type='digit'
              name='parForMePrice'
              value={state.payForMePrice}
              title='差价:'
              onChange={(value) => {
                dispatch({ type: SET_PAY_FOR_ME_PRICE, data: value })
              }}
            ></AtInput> : null}
            {state.objectOfPayment === 'payForOther' ? <AtInput placeholder='在此输入差价'
              type='digit'
              name='payForOtherPrice'
              value={state.payForOtherPrice}
              title='需要补的差价'
              onChange={(value) => {
                dispatch({ type: SET_PAY_FOR_OTHER_PRICE, data: value })
              }}
            ></AtInput> : null}
          </View> : null}
          <AtButton
            circle
            type='primary'
            onClick={() => { dispatch({ type: SET_CURRENT, data: state.current + 1 }) }}
          >下一步</AtButton>
        </View> : null}
        {state.current === 2 ? <View className='step-3'>
          <View className='step-3-text'>
            <Text>8.请填写您发布的物品的详细描述：</Text>
          </View>
          <AtTextarea
            value={state.describe}
            onChange={(event: any) => { dispatch({ type: SET_DESCRIBE, data: event.target.value }) }}
            maxLength={200}
            placeholder='请您输入对物品的详细描述！'
            height={300}
          />
          <View className='step-3-text'>
            <Text>9.请选择您发布的物品的照片：</Text>
          </View>
          <AtImagePicker
            files={state.files}
            onChange={(files: any) => {
              dispatch({ type: SET_FILES, data: files })
            }}
          />
          <AtButton
            circle
            type='secondary'
            onClick={() => {
              Taro.login({
                success(loginResult) {
                  const code = loginResult.code
                  const orderId = productOrderId()
                  const orderStatus=orderStatusObject.released
                  let picsLocation = ''
                  new Promise((resolve, reject) => {
                    if (state.files.length > 0) {
                      for (let i = 0; i < state.files.length; i++) {
                        Taro.uploadFile({
                          url: `${protocol}://${server}:${port}/releasegoodspics`,
                          filePath: state.files[i].url,
                          name: 'pic',
                          header: {
                            'Content-Type': 'multipart/form-data',
                          },
                          formData:{
                            orderId:orderId
                          },
                          success(res) {
                            const data = JSON.parse(res.data)
                            if (res.statusCode === 200 && data.status === 'success') {
                              picsLocation += `${data.location};`
                              if (i === state.files.length - 1) {
                                resolve(picsLocation)
                              }
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
                        typeOne: state.typeOne,
                        typeTwo: state.typeTwo,
                        typeThree: state.typeThree,
                        nameInput: state.nameInput,
                        goodsNumber: state.goodsNumber,
                        newAndOldDegree: state.newAndOldDegree,
                        mode: state.mode,
                        objectOfPayment: state.objectOfPayment,
                        payForMePrice: state.payForMePrice,
                        payForOtherPrice: state.payForOtherPrice,
                        wantExchangeGoods: state.wantExchangeGoods,
                        describe: state.describe,
                        picsLocation: picsLocation,
                        orderId: orderId,
                        code: code,
                        orderStatus:orderStatus
                      },
                      success(res) {
                        if (res.statusCode === 200 && res.data.status === 'success') {
                          dispatch({ type: RELEASED })
                          setTimeout(() => {
                            dispatch({ type: RESET })
                            Taro.pageScrollTo({ scrollTop: 0, duration: 1000 })
                            Taro.navigateTo({url:`/pages/goods-info/goods-info?orderId=${orderId}`})
                          }, 1000)
                        } else {
                          dispatch({type:NOT_RELEASED})
                        }
                      }
                    })
                  })
                }
              })
            }}
          >发布</AtButton>
        </View> : null}
        <AtToast isOpened={state.isRelease} text={state.isRelease?'发布成功':'发布失败！请检查后再提交！'} status={state.isRelease?'success':'error'} duration={1000}></AtToast>
      </View>
  )
}

export default Taro.memo(ReleaseGoodsSteps)