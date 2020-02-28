interface OrderStatusObject{
        released: string;
        trading: string;
        completed: string;
}
const released='released'
const trading = 'trading'
const completed='completed'
const orderStatusObject:OrderStatusObject={
    released,
    trading,
    completed
}
export default orderStatusObject