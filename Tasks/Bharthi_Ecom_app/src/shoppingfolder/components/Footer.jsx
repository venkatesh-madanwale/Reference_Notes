import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>ShopEase Mall</h3>
          <p>Your favorite brands under one roof.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>About</h4>
            <a href="#">Our Story</a>
            <a href="#">Careers</a>
            <a href="#">Investor Relations</a>
          </div>
          <div>
            <h4>Customer Service</h4>
            <a href="#">Help Center</a>
            <a href="#">Returns</a>
            <a href="#">Shipping Info</a>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to our newsletter</h4>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ShopEase Mall. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
