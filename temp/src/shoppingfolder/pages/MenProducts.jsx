import React, { useEffect, useState } from 'react';
import './WomenProducts.css'; // Reuse the same CSS file
import { useCart } from '../../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MensProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: '', size: '', price: '' });
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  useEffect(() => {
    fetch('/mens-shirts.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    let filtered = [...products];

    if (updatedFilters.brand) {
      filtered = filtered.filter(p => p.brand === updatedFilters.brand);
    }

    if (updatedFilters.size) {
      filtered = filtered.filter(p => p.size.includes(updatedFilters.size));
    }

    if (updatedFilters.price) {
      if (updatedFilters.price === 'low') {
        filtered = filtered.filter(p => p.price <= 25);
      } else if (updatedFilters.price === 'mid') {
        filtered = filtered.filter(p => p.price > 25 && p.price <= 40);
      } else if (updatedFilters.price === 'high') {
        filtered = filtered.filter(p => p.price > 40);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(product => product.id === productId);
  };

  return (
    <>
      <Header/>
    <div className="men-products">
      {/* 🔽 Navigation Bar */}
      {/* <div className="order-navbar-wrapper">
        <nav className="order-navbar">
          <div className="nav-logo">
            <Link to="/">ShopEase</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/order-history">Order History</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </nav>
      </div> */}

      <h2>Men's Shirts</h2>

      <button className="toggle-btn" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filters-panel">
          {/* Brand Filter */}
          <div>
            <label>Brand:</label>
            <select onChange={(e) => handleFilterChange('brand', e.target.value)}>
              <option value="">All</option>
              {[...new Set(products.map(p => p.brand))].map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label>Size:</label>
            <select onChange={(e) => handleFilterChange('size', e.target.value)}>
              <option value="">All</option>
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label>Price:</label>
            <select onChange={(e) => handleFilterChange('price', e.target.value)}>
              <option value="">All</option>
              <option value="low">Below $25</option>
              <option value="mid">$25 - $40</option>
              <option value="high">Above $40</option>
            </select>
          </div>
        </div>
      )}

      <div className="cart-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="cart-card">
            <img src={product.image} alt={product.name} className="cart-img" />
            <div className="cart-details">
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Sizes:</strong> {product.size.join(', ')}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Status:</strong> {product.inStock ? "In Stock" : "Out of Stock"}</p>
              <p><strong>Price:</strong> ${product.price}</p>

              {/* Add to Cart Button */}
              <button
                className="add-btn"
                disabled={!product.inStock}
                onClick={() => { addToCart(product); navigate('/cart'); }}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Wishlist Button */}
              <button
                className="wishlist-btn"
                onClick={() =>
                  isInWishlist(product.id)
                    ? handleRemoveFromWishlist(product.id)
                    : handleAddToWishlist(product)
                }
              >
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MensProducts;
