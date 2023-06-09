import { AiFillDollarCircle } from 'react-icons/ai'
import InfoBox from '../../infobox/Infobox'
import styles from './Home.module.scss'
import { FaCartArrowDown } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from '../../../features/orderSlice'
import { STORE_PRODUCTS, selectProducts } from '../../../features/productSlice'
import { BsCart4 } from 'react-icons/bs'
import { useEffect } from 'react'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Chart from '../../chart/Chart'

const earningIcon = <AiFillDollarCircle size={30} color='#b624ff'/>
const productIcon = <BsCart4 size={30} color='#1f93ff'/>
const ordersIcon = <FaCartArrowDown size={30} color='orangered'/>

const Home = () => {
  const totalOrderAmount = useSelector(selectTotalOrderAmount)
  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const dispatch = useDispatch()
  const dbProducts = useFetchCollection('products')
  const {data} = useFetchCollection('orders') 
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products:dbProducts.data}))
    dispatch(STORE_ORDERS(data))
    dispatch(CALC_TOTAL_ORDER_AMOUNT())
  },[dispatch,data,dbProducts])
  return (
    <div className={styles.home}>
    <h2>Admin Home</h2>
    <div className={styles["info-box"]}>
      <InfoBox 
        cardClass={`${styles.card} ${styles.card1}`}
        title={"Earnings"}
        count={`$${totalOrderAmount}`}
        icon={earningIcon}
      />
      <InfoBox
        cardClass={`${styles.card} ${styles.card2}`}
        title={"Products"}
        count={products.length}
        icon={productIcon}
      />
      <InfoBox
        cardClass={`${styles.card} ${styles.card3}`}
        title={"Orders"}
        count={orders.length}
        icon={ordersIcon}
      />
    </div>
    <div>
      <Chart />
    </div>
  </div>
  )
}

export default Home