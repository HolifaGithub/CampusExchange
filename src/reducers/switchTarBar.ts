import {
    SWITCH_TAB_HOME,
    SWITCH_TAB_SORT,
    SWITCH_TAB_RELEASE_GOODS,
    SWITCH_TAB_CHAT,
    SWITCH_TAB_PERSON
} from '../constants/switchTabBar'

const INITIAL_STATE = {
    current: 0
}

export default function fetchPageDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SWITCH_TAB_HOME:
            return Object.assign({}, state, { current: 0 })
        case SWITCH_TAB_SORT:
            return Object.assign({}, state, { current: 1 })
        case SWITCH_TAB_RELEASE_GOODS:
            return Object.assign({}, state, { current: 2 })
        case SWITCH_TAB_CHAT:
            return Object.assign({}, state, { current: 3 })
        case SWITCH_TAB_PERSON:
            return Object.assign({}, state, { current: 4 })
        default:
            return state
    }
}