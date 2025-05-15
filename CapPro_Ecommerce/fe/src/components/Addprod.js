import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Ct';
import './addprod.css'; // Import the dedicated CSS file

const Addprod = () => {
  const [data, setData] = useState({
    name: '',
    price: '',
    cat: '',
    desc: '',
    pimg: ''
  });

  const navigate = useNavigate();
  const obj = useContext(Ct);

  useEffect(() => {
    if (obj.state.token === '') {
      navigate('/login');
    }
  }, [obj.state.token, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, pimg: e.target.files[0] });
  };

  const addProduct = () => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    axios
      .post('http://localhost:5001/add', formData, {
        headers: {
          Authorization: obj.state.token,
          uid: obj.state._id
        }
      })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Error adding product:', err);
      });
  };

  return (
    <div className="addprod-form">
      <h2>Add New Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Product Name"
        value={data.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="price"
        placeholder="Enter Price"
        value={data.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="cat"
        placeholder="Enter Category"
        value={data.cat}
        onChange={handleChange}
        required
      />

      <textarea
        name="desc"
        placeholder="Enter Product Description"
        value={data.desc}
        onChange={handleChange}
        required
      ></textarea>

      <input
        type="file"
        name="pimg"
        onChange={handleFileChange}
        accept="image/*"
        required
      />

      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default Addprod;
