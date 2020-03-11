function transformDateToBefore(str:string) {
    const time =Math.floor((new Date(str).getTime())/1000)
    const nowTime =Math.floor((new Date().getTime())/1000)
    const subSecond = nowTime - time
    let returnStr = ''
    if(subSecond<60){
        return returnStr = '刚刚'
    } 
    const subMinute = Math.floor(subSecond/60)
    if(subMinute>=1&&subMinute<60){
        return returnStr = `${subMinute}分钟前`
    }
    const subHour = Math.floor(subMinute/60)
    if(subHour>=1&&subHour<24){
        return returnStr= `${subHour}小时前`
    }
    const subDay = Math.floor (subHour/24)
    if(subDay >=1 && subDay<32){
        return returnStr= `${subDay}天前`
    }
    const subMonth = Math.floor(subDay/31)
    if(subMonth>=1&&subMonth<13){
        return returnStr= `${subMonth}月前`
    }
    const subYear = Math.floor(subMonth/12)
    return returnStr= `${subYear}年前`
}

export default transformDateToBefore