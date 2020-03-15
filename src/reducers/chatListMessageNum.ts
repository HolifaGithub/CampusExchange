import { ADD_ITEM, RESET_ITEM_MESSAGE_NUM, ADD_SUM_MESSAGE_NUM, ADD_MESSAGE_NUM } from '../constants/chatListMessageNum'

const initState = {
    sumMessage: 0
}

export default function chatListMessageNumReducer(state = initState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return Object.assign({}, state, { [action.id]: 0 })
        case RESET_ITEM_MESSAGE_NUM:
            return Object.assign({}, state, { [action.id]: 0, sumMessage: state.sumMessage - state[action.id] })
        case ADD_SUM_MESSAGE_NUM:
            return Object.assign({}, state, { sumMessage: state.sumMessage + 1, [action.id]: state[action.id] + 1 })
        case ADD_MESSAGE_NUM:
            return Object.assign({}, state, { sumMessage: state.sumMessage + action.notViewMessageNum, [action.id]: state[action.id] + action.notViewMessageNum })
        default:
            return state
    }
}