import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import Validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // for returning to previous page like cart

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));

      if (storedUser) {
        if (values.email === storedUser.email && values.password === storedUser.password) {
          console.log('Login successful');

          // ✅ Save user to localStorage to persist login state
          localStorage.setItem('user', JSON.stringify({ email: storedUser.email }));

          // ✅ Redirect to previous page (e.g., /cart) or home
          const redirectPath = location.state?.from || '/';
          navigate(redirectPath);
        } else {
          alert('Invalid email or password!');
        }
      } else {
        alert('No user found! Please sign up first.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn-login">
            Log in
          </button>

          <p className="terms">
            You agree to our terms and policies
          </p>

          <Link to="/signup" className="btn-signup">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
