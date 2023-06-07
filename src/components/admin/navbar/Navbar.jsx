import { FaUserCircle } from 'react-icons/fa'
import styles from './Navbar.module.scss'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../features/authSlice'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const username = useSelector(selectUserName)
    const activateLink = ({isActive}) => (isActive ? `${styles.active}`: null)
  return (
    <div className={styles.navbar}>
        <div className={styles.user}>
            <FaUserCircle size={40} color='#fff'/>
            <h4>{username}</h4>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/admin/home' className={activateLink}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/all-products' className={activateLink}>All Products</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/add-product/ADD' className={activateLink}>Add Product</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/orders' className={activateLink}>Orders</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar