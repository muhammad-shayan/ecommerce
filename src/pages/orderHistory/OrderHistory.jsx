import { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import styles from './OrderHistory.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ORDERS, selectOrderHistory } from '../../features/orderSlice'
import { selectUserID } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const OrderHistory = () => {
  const {data,isLoading} = useFetchCollection('orders')
  const orders = useSelector(selectOrderHistory)
  const userID = useSelector(selectUserID)
  const filteredOrders = orders.filter(order=>order.userID===userID)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(()=>{
    dispatch(STORE_ORDERS(data))
  },[dispatch,data])
    
  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }
  return (
    <>
      {isLoading && <Loader/>}
      <section>
        <div className={`container ${styles.order}`}>
            <h2>Order History</h2>
            <p>Open an order to leave a <b>Product Review</b></p>
            <br />
            
            <div className={styles.table}>
              {filteredOrders.length === 0? (<p>No orders to show</p>):(
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order,index)=>{
                      const {id,orderDate,orderTime,orderAmount,orderStatus} = order
                      return(
                      <tr key={index} onClick={()=>handleClick(id)}>
                        <td>{index+1}</td>
                        <td>{`${orderDate} at ${orderTime}`}</td>
                        <td>{id}</td>
                        <td>{`$${orderAmount}`}</td>
                        <td>
                          <p className={orderStatus==='delivered'?styles.delivered:styles.pending}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>)
                    })}
                  </tbody>
                                    

                </table>
              )}
            </div>
          </div>
        </section>
      </>
  )
}

export default OrderHistory