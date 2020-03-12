import {ADD_ITEM,RESET_ITEM_MESSAGE_NUM,ADD_SUM_MESSAGE_NUM} from '../constants/chatListMessageNum'

function addItem(id){
    return {
        type:ADD_ITEM,
        id
    }
}

function resetItemMessageNum(id){
    return {
        type:RESET_ITEM_MESSAGE_NUM,
        id
    }
}

function addSumMessageNum(id){
    return {
        type:ADD_SUM_MESSAGE_NUM,
        id
    }
}

export {addItem,resetItemMessageNum,addSumMessageNum}