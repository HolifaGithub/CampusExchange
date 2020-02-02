function getDate(): string {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const result = `${year}年${month}月${day}日`
    return result;
}

export default getDate