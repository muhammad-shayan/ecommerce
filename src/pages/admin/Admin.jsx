import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/admin/navbar/Navbar'
import styles from './Admin.module.scss'
import Home from '../../components/admin/home/Home'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import Orders from '../../components/admin/orders/Orders'
import OrderDetails from '../../components/admin/orderDetails/OrderDetails'

const Admin = () => {
  return (
    <div className={styles.admin}>
        <div className={styles.navbar}></div>
            <Navbar />
            <div className={styles.content}>
                <Routes>
                    <Route path='home' element={<Home />}></Route>
                    <Route path='all-products' element={<ViewProducts />}></Route>
                    <Route path='add-product/:id' element={<AddProduct />}></Route>
                    <Route path='orders' element={<Orders />}></Route>
                    <Route path='order-details/:id' element={<OrderDetails />}></Route>
                </Routes>
            </div>
    </div>
    
  )
}

export default Admin