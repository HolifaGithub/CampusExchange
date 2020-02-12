import { AUTHORIZED, NOT_AUTHORIZED } from '../constants/checkIsAuthorized'

const authorized = () => {
    return {
        type: AUTHORIZED
    }
}


const notAuthorized = () => {
    return {
        type: NOT_AUTHORIZED
    }
}

export  { authorized, notAuthorized }