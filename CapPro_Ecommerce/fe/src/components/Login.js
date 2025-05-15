import axios from 'axios';
import React, { useContext, useState } from 'react';
import Ct from './Ct';
import { useNavigate } from 'react-router-dom';
import './login.css';  // Import the CSS here

const Login = () => {
  let [data, setData] = useState({ "_id": "", "pwd": "" });
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();
  let obj = useContext(Ct);

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let login = () => {
    axios.post("http://localhost:5001/login", data).then((res) => {
      if (res.data.token !== undefined) {
        obj.updstate(res.data);
        navigate("/");
      } else {
        setMsg(res.data.msg);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {msg && <div className="error-msg">{msg}</div>}
        <input
          type="text"
          placeholder="Enter email"
          onChange={fun}
          value={data._id}
          name="_id"
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={fun}
          value={data.pwd}
          name="pwd"
        />
        <button className="btn-login" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
