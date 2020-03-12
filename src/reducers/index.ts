import { combineReducers } from 'redux'
import fetchPageData from './fetchPageData'
import switchTarBar from './switchTarBar'
import checkIsNeedRelogin from './checkIsNeedRelogin'
import chatListMessageNum from './chatListMessageNum'
export default combineReducers({
  fetchPageData,
  switchTarBar,
  checkIsNeedRelogin,
  chatListMessageNum
})
