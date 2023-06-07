import { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import { FaCogs } from 'react-icons/fa'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectMaxPrice, selectMinPrice, selectProducts } from '../../features/productSlice'
import spinnerImg from '../assets/spinner.jpg'

const Products = () => {
  const [showFilter,setShowFilter] = useState(false)
  const {data,isLoading} = useFetchCollection('products')
  const products = useSelector(selectProducts)
  
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products:data}))
    dispatch(GET_PRICE_RANGE({products:data}))
  },[dispatch,data])

  return (
    <section>
      <div className={`container ${styles.product}`}>
          <aside className={showFilter ? `${styles.filter} ${styles.show}`:`${styles.filter}`}>
            {isLoading? null:<ProductFilter/>}
          </aside>
          <div className={styles.content}>
            {isLoading?(
              <img src={spinnerImg} 
              alt='Loading...' 
              style={{width:"50px"}} 
              className='--center-all'/>
            ):(
                <ProductList products={products}/>
            )}
            <div className={styles.icon} onClick={()=>setShowFilter(!showFilter)}>
              <FaCogs size={20} color='orangered'/>
              <p><b>{showFilter?'Hide Filter':'Show Filter'}</b></p>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Products