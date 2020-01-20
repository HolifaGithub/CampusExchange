import { FETCH_PAGE_DATA_RESTART, FETCH_PAGE_DATA_START, FETCH_PAGE_DATA_SUCCESS, FETCH_PAGE_DATA_FAIL } from '../constants/fetchPageData'

const INITIAL_STATE = {
    fetchPageDataStatus: FETCH_PAGE_DATA_RESTART,
    pageData: []
}

export default function fetchPageDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PAGE_DATA_RESTART:
            return Object.assign({}, state, { fetchPageDataStatus: FETCH_PAGE_DATA_RESTART, pageData: [] })
        case FETCH_PAGE_DATA_START:
            return Object.assign({}, state, { fetchPageDataStatus: FETCH_PAGE_DATA_START })
        case FETCH_PAGE_DATA_SUCCESS:
            return Object.assign({}, state, { fetchPageDataStatus: FETCH_PAGE_DATA_SUCCESS, pageData: action.result })
        case FETCH_PAGE_DATA_FAIL:
            return Object.assign({}, state, {
                fetchPageDataStatus: FETCH_PAGE_DATA_FAIL,
                pageData: action.reason
            })
        default:
            return state
    }
}