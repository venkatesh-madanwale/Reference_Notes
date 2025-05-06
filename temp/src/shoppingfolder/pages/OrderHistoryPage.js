import React from 'react';
import { Link } from 'react-router-dom';
import { useOrderHistory } from '../../OrderHistoryContext';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { orderHistory } = useOrderHistory();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="order-navbar">
        <div className="nav-logo">
          <Link to="/">ShopEase Mall</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/order-history">Order History</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
        </ul>
      </nav>

      {/* Order History Content */}
      <div className="order-history">
        <h1>Your Order History</h1>

        {orderHistory.length > 0 ? (
          orderHistory.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <p><strong>Invoice No:</strong> #{order.invoiceNo}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                <span className="order-status">{order.status || 'Delivered'}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id}>
                    <p><strong>{item.name}</strong> — Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders yet.</p>
        )}
      </div>
    </>
  );
};

export default OrderHistoryPage;
