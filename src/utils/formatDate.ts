interface Result{
    year:string;
    month:string;
    day:string;
    hour:string;
    minute:string;
    second:string;
}
function formatDate(source:string):Result{
    const date = new Date(source)
    let year = date.getFullYear().toString()
    let month=(date.getMonth()+1).toString()
    if(parseInt(month)<10){
        month= `0${month}`
    }
    let day=date.getDate().toString()
    if(parseInt(day)<10){
        day= `0${day}`
    }
    let hour =date.getHours().toString()
    if(parseInt(hour)<10){
        hour= `0${hour}`
    }
    let minute=date.getMinutes().toString()
    if(parseInt(minute)<10){
        minute= `0${minute}`
    }
    let second=date.getSeconds().toString()
    if(parseInt(second)<10){
        second= `0${second}`
    }
    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}

export default formatDate