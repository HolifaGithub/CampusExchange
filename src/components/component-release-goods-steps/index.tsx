import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSteps, AtRadio, AtImagePicker, AtTextarea, AtInput, AtButton, AtInputNumber,AtToast } from 'taro-ui'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import './index.scss'

function ReleaseGoodsSteps() {
  let [loading, setLoading] = useState(true)
  let [current, setCurrent] = useState(0)
  let [typeOne, setTypeOne] = useState('')
  let [isSelectedTypeOne, setIsSelectedTypeOne] = useState(false)
  let [typeTwo, setTypeTwo] = useState('')
  let [isSelectedTypeTwo, setIsSelectedTypeTwo] = useState(false)
  let [nameInput, setNameInput] = useState('')
  let [goodsNumber, setGoodsNumber] = useState(1)
  let [newAndOldDegree, setNewAndOldDegree] = useState('100')
  let [isSelectedDegree, setIsSelectedDegree] = useState(false)
  let [mode, setMode] = useState('directSale')
  let [payForMePrice, setPayForMePrice] = useState(0)
  let [wantExchangeGoods, setWantExchangeGoods] = useState('')
  let [objectOfPayment, setObjectOfPayment] = useState('payForMe')
  let [payForOtherPrice, setPayForOtherPrice] = useState(0)
  let [describe, setDescribe] = useState('')
  let [files, setFiles] = useState([])
  let [isRelease,setIsRelease]=useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  const items = [
    {
      'title': '步骤一',
      'desc': '请您选择物品的分类以及名称信息',
      'success': true
    },
    {
      'title': '步骤二',
      'desc': '请您填写物品的数量、价格以及交易形式'
    },
    {
      'title': '步骤三',
      'desc': '请您上传物品的图片以及描述信息',
    }
  ]
  const mapNewAndOldDegree = {
    100: '全新',
    99: '99新',
    98: '98新',
    95: '95新',
    90: '90新',
    85: '85新',
    80: '80新',
    75: '75新',
    70: '70新',
    60: '60新',
    50: '半新',
    30: '很旧',
    10: '伊拉克'
  }
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
            <Text>1.请选择物品的一级分类：</Text>
            {isSelectedTypeOne ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedTypeOne ? null :
            <AtRadio
              options={[
                { label: '手机', value: 'option1' },
                { label: '电脑', value: 'option2' },
                { label: '书籍', value: 'option3' },
                { label: '食品', value: 'option4' },
                { label: '数码家电', value: 'option5' },
                { label: '运动户外', value: 'option6' },
                { label: '服饰鞋靴', value: 'option7' },
                { label: '美妆个护', value: 'option8' },
                { label: '箱包礼品', value: 'option9' },
                { label: '宿舍用品', value: 'option10' },
                { label: '学习文具', value: 'option11' },
                { label: '医疗药品', value: 'option12' },
                { label: '虚拟物品', value: 'option13' },
              ]}
              value={typeOne}
              onClick={(value) => {
                setTypeOne(value)
                setIsSelectedTypeOne(true)
              }}
            />}

          <View className='step-1-text' onClick={() => {
            setIsSelectedTypeTwo(!isSelectedTypeTwo)
          }}>
            <Text>2.请选择物品的二级分类：</Text>
            {isSelectedTypeTwo ? <Image src={`${CDNWebSite}/icon/release-goods-steps/top-arrow.png`} className='icon'></Image> : <Image src={`${CDNWebSite}/icon/release-goods-steps/bottom-arrow.png`} className='icon'></Image>}
          </View>
          {isSelectedTypeTwo ? null : <AtRadio
            options={[
              { label: '手机', value: 'option1' },
              { label: '电脑', value: 'option2' },
              { label: '书籍', value: 'option3' },
              { label: '食品', value: 'option4' },
              { label: '数码家电', value: 'option5' },
              { label: '运动户外', value: 'option6' },
              { label: '服饰鞋靴', value: 'option7' },
              { label: '美妆个护', value: 'option8' },
              { label: '箱包礼品', value: 'option9' },
              { label: '宿舍用品', value: 'option10' },
              { label: '学习文具', value: 'option11' },
              { label: '医疗药品', value: 'option12' },
              { label: '虚拟物品', value: 'option13' },
            ]}
            value={typeTwo}
            onClick={(value) => {
              setTypeTwo(value)
              setIsSelectedTypeTwo(true)
            }}
          />}

          <View className='step-1-text'>
            <Text>3.请输入物品的名称以及型号：</Text>
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
            type='secondary'
            onClick={() => { setCurrent(current + 1) }}
          >下一步</AtButton>
        </View> : null}
        {current === 1 ? <View className='step-2'>
          <View className='step-2-text'>
            <Text>4.请选择物品的数量：</Text>
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
            <Text>5.请选择物品的新旧程度：{mapNewAndOldDegree[newAndOldDegree]}</Text>
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
            <Text>6.请选择物品的交易方式：</Text>
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
              autoFocus
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
              autoFocus
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
              autoFocus
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
              autoFocus
            ></AtInput> : null}
            {objectOfPayment === 'payForOther' ? <AtInput placeholder='在此输入差价'
              type='digit'
              name='payForOtherPrice'
              value={payForOtherPrice}
              title='需要补的差价'
              onChange={(value) => {
                setPayForOtherPrice(value)
              }}
              autoFocus
            ></AtInput> : null}
          </View> : null}
          <AtButton
            circle
            type='secondary'
            onClick={() => { setCurrent(current + 1) }}
          >下一步</AtButton>
        </View> : null}
        {current === 2 ? <View className='step-3'>
          <View className='step-3-text'>
            <Text>7.请填写您发布的物品的详细描述：</Text>
          </View>
          <AtTextarea
            value={describe}
            onChange={(event: any) => { setDescribe(event.target.value) }}
            maxLength={200}
            placeholder='请您输入对物品的详细描述！'
            height={300}
          />
          <View className='step-3-text'>
            <Text>8.请选择您发布的物品的照片：</Text>
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
            onClick={ ()=>{
              setIsRelease(true)
              setTimeout(() => {
                Taro.navigateTo({url:'/pages/not-found/not-found'})
              }, 1000);
            }}
          >发布</AtButton>
        </View> : null}
        <AtToast isOpened={isRelease} text="发布成功！"  status='success' duration={1000}></AtToast>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(ReleaseGoodsSteps)