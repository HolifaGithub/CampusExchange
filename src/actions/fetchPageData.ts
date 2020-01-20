import Taro from '@tarojs/taro'
import { FETCH_PAGE_DATA_RESTART, FETCH_PAGE_DATA_START, FETCH_PAGE_DATA_SUCCESS, FETCH_PAGE_DATA_FAIL } from '../constants/fetchPageData'

const fetchPageDataRestart = () => {
    return {
        type: FETCH_PAGE_DATA_RESTART
    }
}

const fetchPageDataStart = () => {
    return {
        type: FETCH_PAGE_DATA_START
    }
}

const fetchPageDataSuccess = (result) => {
    return {
        type: FETCH_PAGE_DATA_SUCCESS,
        result: result
    }
}

const fetchPageDataFail = (reason) => {
    return {
        type: FETCH_PAGE_DATA_FAIL,
        reason: reason
    }
}

const dispatchFetchPageData = () => {
    return (dispatch) => {
        dispatch(fetchPageDataRestart());
        dispatch(fetchPageDataStart())
        Taro.request({ url: "http://127.0.0.1:3000" }).then((result) => {
            if (result.data.statusCode === 200) {
                dispatch(fetchPageDataSuccess(result.data.result))
            } else {
                dispatch(fetchPageDataFail(result.data.reason))
            }
        })
    }
}
export { fetchPageDataRestart, fetchPageDataStart, fetchPageDataSuccess, fetchPageDataFail, dispatchFetchPageData }