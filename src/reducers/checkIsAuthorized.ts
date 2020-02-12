import {AUTHORIZED, NOT_AUTHORIZED} from '../constants/checkIsAuthorized'

const INITIAL_STATE = {
    isAuthorized: true
}

export default function fetchPageDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTHORIZED:
            return Object.assign({}, state, { isAuthorized: true })
        case NOT_AUTHORIZED:
            return Object.assign({}, state, { isAuthorized: false })
        default:
            return state
    }
}