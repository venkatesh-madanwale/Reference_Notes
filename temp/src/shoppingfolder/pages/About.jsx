import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

const About = () => {
  return (
    <>
      <Header />

      <main className="about-page">
        <article className="about-content">
          <h1>About ShopEase Mall</h1>

          <section>
            <h2>Welcome to ShopEase Mall</h2>
            <p>
              At <span className="highlight">ShopEase Mall</span>, we believe shopping should be simple, fun, and accessible for everyone.
              Discover a handpicked collection of stylish, high-quality products for men, women, and children—all in one place.
            </p>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>
              Our mission is to deliver a seamless online shopping experience that saves you time, offers unbeatable value, and builds trust.
              From fashion to beauty to everyday essentials, we’ve got everything you need.
            </p>
          </section>

          <section>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>✨ Curated, high-quality products</li>
              <li>🚚 Fast & dependable delivery</li>
              <li>💳 Safe and secure payments</li>
              <li>💬 Friendly, responsive support</li>
            </ul>
          </section>

          <footer className="about-footer">
            <p>&copy; {new Date().getFullYear()} ShopEase Mall. All rights reserved.</p>
          </footer>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default About;
