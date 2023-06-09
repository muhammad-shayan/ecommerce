import { Link, NavLink } from 'react-router-dom'
import style from'./Header.module.scss'
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { reset, set_active_user } from '../../features/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../hiddenLinks/hiddenLinks'
import { AdminOnlyLinks } from '../adminOnlyRoutes/AdminOnlyRoutes'
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../features/cartSlice'


export default function Header() {

  const [showMenu,setShowMenu] = useState(false)
  const [displayName,setDisplayName] = useState('')
  const cartQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch()
  const hideMenu = () => setShowMenu(false)

  const activateLink = ({isActive}) => isActive?`${style.active}`:''
  const logoutHandle = () => {
    signOut(auth).then(()=>toast.success('Logout successful'))
    .catch(error=>toast.error(error.message))
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(!user.displayName){
          const u1 = user.email.split('@')[0]
          const userName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(userName)
        }
        else{
          setDisplayName(user.displayName)
        }
        dispatch(set_active_user({
          userName: displayName,
          email: user.email,
          userID: user.uid
        }))
      
      } else {
        setDisplayName('')
        dispatch(reset())
      }
    });
  },[dispatch,displayName])

  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[dispatch])

  const logo = (
  <div className={style.logo}>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link> 
  </div>
  )
  const cart = (
    <span className={style.cart}>
      <Link to='/cart'>
        Cart
        <FaShoppingCart size={20}/>
        <p>{cartQuantity}</p> 
      </Link>
    </span>
  )

  return (
    <header>
      <div className={style.header}>
       {logo}
       <nav className={showMenu?`${style['show-nav']}`:`${style['hide-nav']}`}>
       <div className={showMenu?`${style['nav-wrapper']} ${style['show-nav-wrapper']}`:`${style['nav-wrapper']}`} onClick={hideMenu}></div>
        <ul onClick={hideMenu}>
          <li className={style['logo-mobile']}>
            {logo}
            <FaTimes onClick={hideMenu} size={28}/>
          </li>
          <li><AdminOnlyLinks>
              <Link to='/admin/home'><button className="--btn --btn-primary">Admin</button></Link>
            </AdminOnlyLinks></li>
          <li><NavLink className={activateLink} to='/'>Home</NavLink></li>
          <li><NavLink className={activateLink} to='/contact'>Contact Us</NavLink></li>
        </ul>
        <div className={style["header-right"]} onClick={hideMenu}>
        <span className={style.links}>
          <ShowOnLogout>
            <NavLink className={activateLink} to='/login'>Login</NavLink>
          </ShowOnLogout>
          <ShowOnLogin>
            <a href="#" style={{color:'#ff7722'}}><FaUserCircle size={16}/>Hi, {displayName}</a>
          </ShowOnLogin>
          <ShowOnLogin>
            <NavLink className={activateLink} to='/order-history'>My Orders</NavLink>
          </ShowOnLogin>
          <ShowOnLogin>
            <NavLink to='/' onClick={logoutHandle}>Logout</NavLink>
          </ShowOnLogin>
        </span>
        {cart}
       </div>
       </nav>

       <div className={style["menu-icon"]}>
        {cart}
        <HiOutlineMenuAlt3 size={28} onClick={()=>setShowMenu(!showMenu)}/>
       </div>
      
      </div>
    </header>
  )
}
