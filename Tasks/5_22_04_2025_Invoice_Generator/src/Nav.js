import React from 'react';
import './nav.css'; 
const Nav = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Nav;