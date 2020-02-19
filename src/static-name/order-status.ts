interface OrderStatusObject{
        released: string;
        transaction: string;
        completed: string;
}
const released='released'
const transaction = 'transaction'
const completed='completed'
const orderStatusObject:OrderStatusObject={
    released,
    transaction,
    completed
}
export default orderStatusObject