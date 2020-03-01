import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { CDNWebSite } from '../../static-name/web-site'
import Skeleton from 'taro-skeleton'
import promiseApi from '../../utils/promiseApi'
import './index.scss'
function onClickRecharge(){
  promiseApi(Taro.navigateTo)({
    url:'/packageA/pages/recharge/recharge'
  })
}

function onClickFollowPerson(){
  promiseApi(Taro.navigateTo)({
    url:'/packageA/pages/care-people/care-people'
  })
}
function GetInfoBars(props) {
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])
  return (
    <Skeleton
      row={1}
      rowHeight={60}
      animate
      loading={loading}
    >
      <View className='get-info-bars-container'>
        <View className='get-info-bar-container' onClick={onClickRecharge} hoverClass='hover' hoverStayTime={500}>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/recharge.png`}></Image>
          <Text>充值</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container' hoverClass='hover' hoverStayTime={500} onClick={()=>{onClickFollowPerson()}}>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/follow-person.png`}></Image>
          <Text>关注</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container' hoverClass='hover' hoverStayTime={500}>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/collection.png`}></Image>
          <Text>收藏</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
        <View className='get-info-bar-container' hoverClass='hover' hoverStayTime={500}>
          <Image className='icon' src={`${CDNWebSite}/icon/user-info/card-ticket.png`}></Image>
          <Text>卡券</Text>
          <Image className='icon arrow' src={`${CDNWebSite}/icon/user-info/arrow.png`}>
          </Image>
        </View>
      </View>
    </Skeleton>
  )
}

export default Taro.memo(GetInfoBars)