import {
    SWITCH_TAB_HOME,
    SWITCH_TAB_SORT,
    SWITCH_TAB_RELEASE_GOODS,
    SWITCH_TAB_CHAT,
    SWITCH_TAB_PERSON
} from '../constants/switchTabBar'

const switchTabHome = () => {
    return {
        type: SWITCH_TAB_HOME
    }
}

const switchTabSort = () => {
    return {
        type: SWITCH_TAB_SORT
    }
}

const switchTabReleaseGoods = () => {
    return {
        type: SWITCH_TAB_RELEASE_GOODS
    }
}

const switchTabChat = () => {
    return {
        type: SWITCH_TAB_CHAT
    }
}

const switchTabPerson = () => {
    return {
        type: SWITCH_TAB_PERSON
    }
}
export {
    switchTabHome,
    switchTabSort,
    switchTabReleaseGoods,
    switchTabChat,
    switchTabPerson
}