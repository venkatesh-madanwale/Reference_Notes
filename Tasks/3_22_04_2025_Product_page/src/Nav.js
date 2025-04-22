import { Link } from 'react-router-dom'
import "./nav.css"
const Nav = () => {
  return (
    <div className='nav'>
       <Link to="/">Home</Link>
       <Link to="/">Category</Link>
       <Link to="/">Cart</Link>
       <Link to="/login">Login</Link>
       <Link to="/register">Register</Link>
    </div>
  )
}

export default Nav