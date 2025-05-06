import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <>
      <header className="headerSection">
        <div className="left">
          <h2 className="title">
            <Link to="/" className="homeLink">ShopEase Mall</Link>
          </h2>
        </div>

        <nav className="center">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="dropdown">
              <span className="dropbtn">Category ▾</span>
              <ul className="dropdown-content">
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/children">Children</Link></li>
                <li><Link to="/beauty">Beauty</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="right">
          <Link to="/login">Signin/Signup</Link>
          <Link to="/order-history">Order History</Link>
          <Link to="/wishlist">💖 Wishlist</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>
      </header>

      <main className="about-page">
        <div className="about-content">
          <h1>About ShopEase Mall</h1>

          <section>
            <h2>Welcome to ShopEase Mall</h2>
            <p>
              At <span className="highlight">ShopEase Mall</span>, we believe shopping should be simple, fun, and accessible to everyone.
              We bring together a curated collection of stylish, high-quality products for men, women, and children—all in one place.
            </p>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>
              Our mission is to offer a seamless online shopping experience that saves you time, delivers great value, and inspires confidence.
              From fashion to beauty to essentials, we’ve got it all covered.
            </p>
          </section>

          <section>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>✨ Hand-picked, quality products</li>
              <li>🚚 Fast and reliable shipping</li>
              <li>💳 Secure payment options</li>
              <li>💬 Friendly customer support</li>
            </ul>
          </section>

          <footer className="about-footer">
            <p>&copy; {new Date().getFullYear()} ShopEase Mall. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default About;
