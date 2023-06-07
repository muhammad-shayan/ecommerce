import { Link } from "react-router-dom"
import Card from "../../card/Card"
import styles from './ProductItem.module.scss'
import { useDispatch } from "react-redux"
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../../features/cartSlice"
const ProductItem = ({product,grid,id,name,price,desc,imageURL}) => {
  const dispatch = useDispatch()
  const shortenText = (text,size) => {
    if (text.length>size){
      return text.substring(0,size).concat('...')
    }
    return text
  }

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  return (
    <Card cardClass={grid?`${styles.grid}`:`${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{grid?shortenText(name,18):shortenText(name,100)}</h4>
        </div>
        {!grid && (<p className={styles.desc}>{shortenText(desc,200)}</p>)}
        <button className="--btn --btn-danger" onClick={()=>addToCart(product)}>Add to Cart</button>
      </div>
    </Card>
  )
}

export default ProductItem