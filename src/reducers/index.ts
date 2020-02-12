import { combineReducers } from 'redux'
import fetchPageData from './fetchPageData'
import switchTarBar from './switchTarBar'
import checkIsAuthorized from './checkIsAuthorized'
export default combineReducers({
  fetchPageData,
  switchTarBar,
  checkIsAuthorized
})
