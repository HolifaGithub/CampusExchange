import { combineReducers } from 'redux'
import fetchPageData from './fetchPageData'
import switchTarBar from './switchTarBar'

export default combineReducers({
  fetchPageData,
  switchTarBar
})
