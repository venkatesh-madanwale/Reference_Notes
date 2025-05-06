import React, { useEffect, useState } from 'react';
import './WomenProducts.css';
import { useCart } from '../../CartContext';
import { useSearch } from '../../SearchContext';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice'; // Import Redux actions

const WomenProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: '', size: '', price: '' });
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items); // Get wishlist from Redux store

  useEffect(() => {
    fetch('/womens-tops.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(applyFilters(data, filters, searchTerm));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filters, searchTerm));
  }, [filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = (items, filters, term) => {
    let filtered = [...items];

    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }

    if (filters.size) {
      filtered = filtered.filter(p => p.size.includes(filters.size));
    }

    if (filters.price) {
      if (filters.price === 'low') {
        filtered = filtered.filter(p => p.price <= 25);
      } else if (filters.price === 'mid') {
        filtered = filtered.filter(p => p.price > 25 && p.price <= 40);
      } else if (filters.price === 'high') {
        filtered = filtered.filter(p => p.price > 40);
      }
    }

    if (term) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.brand.toLowerCase().includes(term.toLowerCase()) ||
        p.category.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    return filtered;
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
    <div className="women-products">

      {/* 🔽 Navigation Bar */}
      <div className="order-navbar-wrapper">
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
      </div>

      <h2>Women's Dresses</h2>

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
              
              <div className="card-buttons">
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
                onClick={() => isInWishlist(product.id) ? handleRemoveFromWishlist(product.id) : handleAddToWishlist(product)}
              >
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;
