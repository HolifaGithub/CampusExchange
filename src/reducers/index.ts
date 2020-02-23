import { combineReducers } from 'redux'
import fetchPageData from './fetchPageData'
import switchTarBar from './switchTarBar'
import checkIsNeedRelogin from './checkIsNeedRelogin'
export default combineReducers({
  fetchPageData,
  switchTarBar,
  checkIsNeedRelogin
})
