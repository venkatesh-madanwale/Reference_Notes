// Nav.js
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'
import './nav.css'

const Nav = () => {
  let obj = useContext(Ct);
  return (
    <nav className='nav-container'>
      <div className='nav-logo'><Link to="/">E-Shop</Link></div>
      <div className='nav-links'>
        <Link to="/">Products</Link>
        {obj.state.token === "" && <Link to="/reg">Register</Link>}
        {obj.state.token === "" && <Link to="/login">Login</Link>}
        {obj.state.token !== "" && obj.state.role === "admin" && <Link to="/add">Add Product</Link>}
        {obj.state.token !== "" && (
          <Link to="/cart">
            Cart <span className='cart-badge'>{obj.state.cartlength}</span>
          </Link>
        )}
        {obj.state.token !== "" && <Link to="/logout">Logout</Link>}
      </div>
      {obj.state.token !== "" && <div className='nav-username'>Hi, {obj.state.name}</div>}
    </nav>
  )
}

export default Nav;