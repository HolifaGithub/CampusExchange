function isNullOrUndefined(target) {
    if (Object.prototype.toString.call(target).slice(8, -1) === 'Null' || Object.prototype.toString.call(target).slice(8, -1) === 'Undefined') {
        return true
    }
    return false
}

export default isNullOrUndefined