import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './WishlistPage.css'; // Optional: If you want styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.items);

  return (
    <>
    <Header/>
      {/* Navigation Bar (Same as Order History) */}
      {/* <nav className="order-navbar">
        <div className="nav-logo">
          <Link to="/">ShopEase Mall</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/order-history">Order History</Link></li>
        </ul>
      </nav> */}

      {/* Wishlist Content */}
      <div className="wishlist-page">
        <h2> Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
                 <Link
                 key={item.id}
                 to={`/${item.category}/product/${item.id}`} // Link to the correct product page based on category and ID
                 className="wishlist-item"
               >
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Wishlist;
