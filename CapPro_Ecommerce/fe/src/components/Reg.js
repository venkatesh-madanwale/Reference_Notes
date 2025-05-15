import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reg.css';  // import the css here

const Reg = () => {
  const [data, setData] = useState({ _id: '', name: '', phno: '', pwd: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // simple regex email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const add = () => {
    const { _id, name, phno, pwd } = data;

    if (!_id || !name || !phno || !pwd) {
      setMsg('Please enter data into all fields');
      return;
    }
    if (!validateEmail(_id)) {
      setMsg('Please enter a valid email address');
      return;
    }
    if (phno.length < 10) {
      setMsg('Phone number should be at least 10 digits');
      return;
    }

    axios.post('http://localhost:5001/reg', data)
      .then((res) => {
        setMsg(res.data.msg);
        if (res.data.msg === 'reg done') {
          navigate('/login');
        }
      })
      .catch(() => setMsg('Registration failed. Please try again.'));
  };

  return (
    <div className="reg-container">
      <div className="reg-form">
        {msg && <div className="msg">{msg}</div>}

        <input
          type="text"
          placeholder="Enter Email"
          name="_id"
          onChange={handleChange}
          value={data._id}
          autoComplete="email"
        />
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          name="phno"
          onChange={handleChange}
          value={data.phno}
          maxLength="15"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="pwd"
          onChange={handleChange}
          value={data.pwd}
          autoComplete="new-password"
        />
        <button className="btn-register" onClick={add}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Reg;
