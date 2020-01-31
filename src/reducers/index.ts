import { combineReducers } from 'redux'
import fetchPageData from './fetchPageData'
import switchTarbar from './switchTarBar'

export default combineReducers({
  fetchPageData,
  switchTarbar
})
