import Taro, { useState, useEffect, useReducer } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtSteps, AtRadio, AtImagePicker, AtTextarea, AtInput, AtButton, AtInputNumber, AtToast } from 'taro-ui'
import goodsTypeGridsDatas from '../../static-name/goods-sort'
import mapNewAndOldDegree from '../../static-name/new-and-old-degree'
import { CDNWebSite } from '../../static-name/web-site'
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
  tyoeThreeList: TypeAtRadioOptionsList[];
  typeOneDatas: TypeTwo[]
}


const TYPE_ONE_LIST_PUSH_OPTIONS = 'TYPE_ONE_LIST_PUSH_OPTIONS'
const TYPE_TWO_LIST_PUSH_OPTIONS = 'TYPE_TWO_LIST_PUSH_OPTIONS'
const TYPE_THREE_LIST_PUSH_OPTIONS = 'TYPE_THREE_LIST_PUSH_OPTIONS'
const RECORD_TYPE_ONE_DATAS = 'RECORD_TYPE_ONE_DATAS'
function reducer(state, action) {
  switch (action.type) {
    case TYPE_ONE_LIST_PUSH_OPTIONS:
      return Object.assign(state, { typeOneList: action.data })
    case TYPE_TWO_LIST_PUSH_OPTIONS:
      return Object.assign(state, { typeTwoList: action.data })
    case TYPE_THREE_LIST_PUSH_OPTIONS:
      return Object.assign(state, { typeThreeList: action.data })
    case RECORD_TYPE_ONE_DATAS:
      return Object.assign(state, { typeOneDatas: action.data })
    default:
      return state
  }
}
function ReleaseGoodsSteps() {
  let [loading, setLoading] = useState(true)
  let [current, setCurrent] = useState(0)
  let [typeOne, setTypeOne] = useState('')
  let [isSelectedTypeOne, setIsSelectedTypeOne] = useState(false)
  let [typeTwo, setTypeTwo] = useState('')
  let [isSelectedTypeTwo, setIsSelectedTypeTwo] = useState(false)
  let [typeThree, setTypeThree] = useState('')
  let [isSelectedTypeThree, setIsSelectedTypeThree] = useState(false)
  let [customTypeThree, setCustomTypeThree] = useState(false)
  let [nameInput, setNameInput] = useState('')
  let [goodsNumber, setGoodsNumber] = useState(1)
  let [newAndOldDegree, setNewAndOldDegree] = useState('')
  let [isSelectedDegree, setIsSelectedDegree] = useState(false)
  let [mode, setMode] = useState('')
  let [payForMePrice, setPayForMePrice] = useState(0)
  let [wantExchangeGoods, setWantExchangeGoods] = useState('')
  let [objectOfPayment, setObjectOfPayment] = useState('payForMe')
  let [payForOtherPrice, setPayForOtherPrice] = useState(0)
  let [describe, setDescribe] = useState('')
  let [files, setFiles] = useState([])
  let [isRelease, setIsRelease] = useState(false)
  const initState: InitState = {
    typeOneList: [],
    typeTwoList: [],
    tyoeThreeList: [],
    typeOneDatas: []
  }
  const [state, dispatch] = useReducer(reducer, initState);
  let _typeOneList: TypeAtRadioOptionsList[] = []
  let _typeTwoList: TypeAtRadioOptionsList[] = []
  let _typeThreeList: TypeAtRadioOptionsList[] = []
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    for (let i of goodsTypeGridsDatas) {
      _typeOneList.push({ label: i.typeOne, value: i.typeOne })
    }
    dispatch({ type: TYPE_ONE_LIST_PUSH_OPTIONS, data: _typeOneList })
  }, [])
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
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='release-goods-steps'>
        <AtSteps
          items={items}
          current={current}
          onChange={(current) => { setCurrent(current) }}
        />
        {current === 0 ? <View className='step-1'>
          <View className='step-1-text' onClick={() => {
            setIsSelectedTypeOne(!isSelectedTypeOne)
          }}>
            <Text>1.请选择物品的一级分类：{typeOne}</Text>
            {isSelectedTypeOne ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedTypeOne ? null :
            <AtRadio
              options={state.typeOneList}
              value={typeOne}
              onClick={(value) => {
                setTypeOne(value)
                setIsSelectedTypeOne(true)
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
            setIsSelectedTypeTwo(!isSelectedTypeTwo)
          }}>
            <Text>2.请选择物品的二级分类：{typeTwo}</Text>
            {isSelectedTypeTwo ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedTypeTwo ? null : <AtRadio
            options={state.typeTwoList}
            value={typeTwo}
            onClick={(value) => {
              setTypeTwo(value)
              setIsSelectedTypeTwo(true)
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
            setIsSelectedTypeThree(!isSelectedTypeThree)
          }}>
            <Text>3.请选择物品的三级分类：{typeThree}</Text>
            {isSelectedTypeThree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedTypeThree ? null : (
            <View>
              {!customTypeThree ? <AtRadio
                options={state.typeThreeList}
                value={typeThree}
                onClick={(value) => {
                  setTypeThree(value)
                  setIsSelectedTypeThree(true)
                }}
              /> : null}
              <View className='custom-type-three'>
                {!customTypeThree ? <View className='tip' onClick={() => { setCustomTypeThree(true) }}>没有想要的?点击我自定义分类!</View> : null}
                {customTypeThree ? <AtInput placeholder='在此输入物品的三级分类名'
                  type='string'
                  name='typeThreeInput'
                  value={typeThree}
                  onChange={(value) => {
                    setTypeThree(value)
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
              value={nameInput}
              onChange={(value) => {
                setNameInput(value)
              }}
              autoFocus
            ></AtInput>
          </View>
          <AtButton
            circle
            type='primary'
            onClick={() => { setCurrent(current + 1) }}
            full
          >下一步</AtButton>
        </View> : null}
        {current === 1 ? <View className='step-2'>
          <View className='step-2-text'>
            <Text>5.请选择物品的数量：</Text>
            <AtInputNumber
              type='number'
              min={1}
              max={99}
              step={1}
              value={goodsNumber}
              onChange={(value) => { setGoodsNumber(value) }}
            />
          </View>

          <View className='step-2-text' onClick={() => {
            setIsSelectedDegree(!isSelectedDegree)
          }}>
            <Text>6.请选择物品的新旧程度：{mapNewAndOldDegree[newAndOldDegree]}</Text>
            {isSelectedDegree ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedDegree ? null :
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
              value={newAndOldDegree}
              onClick={(value) => {
                setNewAndOldDegree(value)
                setIsSelectedDegree(true)
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
            value={mode}
            onClick={(mode) => {
              setMode(mode)
            }}
          />
          {mode === 'directSale' ? <View className='direct-sale'>
            <View className='mode-text'>您想要卖的价格是(元)：</View>
            <AtInput placeholder='在此输入您想要卖的价格'
              type='digit'
              name='parForMePrice'
              value={payForMePrice}
              onChange={(value) => {
                setPayForMePrice(value)
              }}
            ></AtInput>
          </View> : null}

          {mode === 'directExchange' ? <View className='direct-exchange'>
            <View className='mode-text'>您想要换的物品是：</View>
            <AtInput placeholder='在此输入您想要换的物品的名称'
              type='string'
              name='wantExchangeGoods'
              value={wantExchangeGoods}
              onChange={(value) => {
                setWantExchangeGoods(value)
              }}
            ></AtInput>
          </View> : null}

          {mode === 'priceDifference' ? <View className='priceDifference'>
            <View className='mode-text'>您想要差价换的物品是：</View>
            <AtInput placeholder='在此输入您想要换的物品的名称'
              type='string'
              name='wantExchangeGoods'
              value={wantExchangeGoods}
              onChange={(value) => {
                setWantExchangeGoods(value)
              }}
            ></AtInput>
            <View className='mode-text'>换了上面物品后要补的差价是(元)：</View>
            <AtRadio
              options={[
                { label: 'TA向我支付', value: 'payForMe' },
                { label: '我向TA支付', value: 'payForOther' },
              ]}
              value={objectOfPayment}
              onClick={(value) => {
                setObjectOfPayment(value)
              }}
            />
            {objectOfPayment === 'payForMe' ? <AtInput placeholder='在此输入差价'
              type='digit'
              name='parForMePrice'
              value={payForMePrice}
              title='差价:'
              onChange={(value) => {
                setPayForMePrice(value)
              }}
            ></AtInput> : null}
            {objectOfPayment === 'payForOther' ? <AtInput placeholder='在此输入差价'
              type='digit'
              name='payForOtherPrice'
              value={payForOtherPrice}
              title='需要补的差价'
              onChange={(value) => {
                setPayForOtherPrice(value)
              }}
            ></AtInput> : null}
          </View> : null}
          <AtButton
            circle
            type='primary'
            onClick={() => { setCurrent(current + 1) }}
          >下一步</AtButton>
        </View> : null}
        {current === 2 ? <View className='step-3'>
          <View className='step-3-text'>
            <Text>8.请填写您发布的物品的详细描述：</Text>
          </View>
          <AtTextarea
            value={describe}
            onChange={(event: any) => { setDescribe(event.target.value) }}
            maxLength={200}
            placeholder='请您输入对物品的详细描述！'
            height={300}
          />
          <View className='step-3-text'>
            <Text>9.请选择您发布的物品的照片：</Text>
          </View>
          <AtImagePicker
            files={files}
            onChange={(files: any) => {
              setFiles(files)
            }}
          />
          <AtButton
            circle
            type='secondary'
            onClick={() => {
              setIsRelease(true)
              setTimeout(() => {
                Taro.navigateTo({ url: '/pages/not-found/not-found' })
              }, 1000);
            }}
          >发布</AtButton>
        </View> : null}
        <AtToast isOpened={isRelease} text="发布成功！" status='success' duration={1000}></AtToast>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(ReleaseGoodsSteps)