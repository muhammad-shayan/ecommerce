orderHistory = [{orderAmount:10},{orderAmount:15},{orderAmount:20}]

const arr = []
orderHistory.map((order)=>arr.push(order.orderAmount))

const totalAmount = arr.reduce((a,b)=>a+b,0)

console.log(totalAmount);