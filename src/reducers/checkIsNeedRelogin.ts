import {NEED_RELOGIN,NOT_NEED_RELOGIN} from '../constants/checkIsNeedRelogin'

const INITIAL_STATE = {
    isNeedRelogin:false
}

export default function fetchPageDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case NEED_RELOGIN:
            return Object.assign({}, state, { isNeedRelogin: true })
        case NOT_NEED_RELOGIN:
            return Object.assign({}, state, { isNeedRelogin: false })
        default:
            return state
    }
}