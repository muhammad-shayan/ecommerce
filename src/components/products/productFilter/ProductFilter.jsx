import styles from './ProductFilter.module.scss'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../features/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../features/filterSlice'


const ProductFilter = () => {
    const products = useSelector(selectProducts)
    const minPrice = useSelector(selectMinPrice)
    const maxPrice = useSelector(selectMaxPrice)  
    const [category,setCategory] = useState('All')
    const [brand,setBrand] = useState('All')
    const [price,setPrice] = useState(5000)
    
    

    const allCategories = ['All', ...new Set(products.map((product)=>product.category))]
    
    const allBrands = ['All', ...new Set(products.map((product)=>product.brand))]

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(FILTER_BY_CATEGORY({products,category}))
    },[dispatch,products,category])

    
    useEffect(()=>{
      dispatch(FILTER_BY_BRAND({products,brand}))
    },[dispatch,products,brand])

    
    useEffect(()=>{
      dispatch(FILTER_BY_PRICE({products,price}))
    },[dispatch,products,price])

    const clearFilters = () =>{
      setCategory('All')
      setBrand('All')
      setPrice(maxPrice)
    }


  return (
    <div className={styles.filter}>
        <h4>Categories</h4>
        <div className={styles.category}>
          {allCategories.map((cat,index)=>{
              return(
                  <button key={index} 
                          type='button'
                          className={cat === category?styles.active:null}
                          onClick={()=>setCategory(cat)}>&#8250; {cat}</button>
              )
          })}
        </div>
        <h4>Brand</h4>
        <div className={styles.brand}>
          <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
            {allBrands.map((eachBrand,index)=>{
              return (
                <option key={index} value={eachBrand}>{eachBrand}</option>
              )
            })}
          </select>
        </div>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input type="range" value={price} min={minPrice} max={maxPrice} onChange={(e)=>setPrice(e.target.value)} />
        </div>
        <br/>
        <button className='--btn --btn-danger' onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}

export default ProductFilter