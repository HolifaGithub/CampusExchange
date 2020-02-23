import { NEED_RELOGIN,NOT_NEED_RELOGIN } from '../constants/checkIsNeedRelogin'

const needRelogin = () => {
    return {
        type: NEED_RELOGIN
    }
}


const notNeedRelogin = () => {
    return {
        type: NOT_NEED_RELOGIN
    }
}

export  { needRelogin, notNeedRelogin }