import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Ct from './Ct';
import './cart.css'; // Import the CSS file

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [ctotal, setCtotal] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const obj = useContext(Ct);
  const navigate = useNavigate();

  useEffect(() => {
    if (obj.state._id === '') {
      navigate('/login');
    } else {
      axios
        .get(`http://localhost:5001/cart/${obj.state._id}`, {
          headers: { Authorization: obj.state.token },
        })
        .then((res) => {
          setCart(res.data);
          obj.updstate({ cartlength: res.data.length });

          const sum = res.data.reduce(
            (acc, item) => acc + item.qty * item.price,
            0
          );
          setCtotal(sum);
        });
    }
  }, [refresh]);

  const inc = (cid) => {
    axios
      .get(`http://localhost:5001/inc/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(() => setRefresh(!refresh));
  };

  const dec = (cid, qty) => {
    if (qty > 1) {
      axios
        .get(`http://localhost:5001/dec/${cid}`, {
          headers: { Authorization: obj.state.token },
        })
        .then(() => setRefresh(!refresh));
    } else {
      del(cid);
    }
  };

  const del = (cid) => {
    axios
      .delete(`http://localhost:5001/del/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(() => setRefresh(!refresh));
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart">Your cart is empty.</div>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={item._id}>
                <img
                  src={`http://localhost:5001/pimgs/${item.pimg}`}
                  alt={item.name}
                  className="cart-img"
                />
                <div className="cart-details">
                  <h3>{item.name.toUpperCase()}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => dec(item._id, item.qty)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => inc(item._id)}>+</button>
                  </div>
                  <p className="item-total">Total: ₹{item.price * item.qty}</p>
                  <button className="btn-delete" onClick={() => del(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">Cart Total: ₹{ctotal}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
