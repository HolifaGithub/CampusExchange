function productOrderId(){
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute=dateObj.getMinutes()
    const second=dateObj.getSeconds()
    let randomString=''
    for(let i =0;i<5;i++){
        randomString+=Math.floor(Math.random()*10)
    }
    return `${year}${month}${day}${hour}${minute}${second}${randomString}`
}
export default productOrderId