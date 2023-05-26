import { Link, NavLink } from 'react-router-dom'
import style from'./Header.module.scss'
import {FaShoppingCart, FaTimes} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { useState } from 'react'

export default function Header() {

  const [showMenu,setShowMenu] = useState(false)
  const hideMenu = () => setShowMenu(false)

  const activateLink = ({isActive}) => isActive?`${style.active}`:''

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
        <p>0</p> 
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
          <li><NavLink className={activateLink} to='/'>Home</NavLink></li>
          <li><NavLink className={activateLink} to='/contact'>Contact Us</NavLink></li>
        </ul>
        <div className={style["header-right"]} onClick={hideMenu}>
        <span className={style.links}>
          <NavLink className={activateLink} to='/login'>Login</NavLink>
          <NavLink className={activateLink} to='/register'>Register</NavLink>
          <NavLink className={activateLink} to='/order-history'>My Orders</NavLink>
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
