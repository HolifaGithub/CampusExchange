interface Result{
    year:number;
    month:number;
    day:number;
    hour:number;
    minute:number;
    second:number;
}
function formatDate(source:string):Result{
    const date = new Date(source)
    const year = date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    const hour =date.getHours()
    const minute=date.getMinutes()
    const second=date.getSeconds()
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