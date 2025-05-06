import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Validation from './Validation';
import Header from './shoppingfolder/components/Header'
import Footer from './shoppingfolder/components/Footer';


function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // ✅ Use validationErrors instead of errors
    if (Object.keys(validationErrors).length === 0) {
      // ✅ Save user details to sessionStorage
      sessionStorage.setItem('user', JSON.stringify(values));

      // ✅ Clear any existing login info from localStorage
      localStorage.removeItem('user');

      console.log('User signed up and data stored:', values);
      alert('Successfully registered! You can now log in.');

      // ✅ Navigate to login
      navigate('/login');
    }
  };

  return (
    <>
    <Header/>
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"><strong>Name</strong></label>
            <input 
              type="text" 
              id="name"
              placeholder="Enter your name"
              name="name"
              value={values.name}
              onChange={handleInput}
              className="form-control"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="form-control"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-signup">
            Sign Up
          </button>

          <p className="terms">
            You agree to our terms and policies
          </p>

          <Link to="/login" className="btn-login-link">
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Signup;
