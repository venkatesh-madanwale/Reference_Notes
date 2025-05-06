import React, { useEffect, useState } from 'react';
import { useCart } from '../../CartContext';
import { useOrderHistory } from '../../OrderHistoryContext';
import { useNavigate } from 'react-router-dom';   // Import useNavigate
import './InvoicePage.css';

const InvoicePage = () => {
  const { cart } = useCart();
  const { orderHistory, addOrder } = useOrderHistory();
  const [invoiceNo, setInvoiceNo] = useState(null);
  const navigate = useNavigate();   // Create navigate function

  const currentDate = new Date().toLocaleDateString();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  useEffect(() => {
    if (cart.length > 0 && invoiceNo === null) {
      const generatedInvoiceNo = Math.floor(Math.random() * 1000000);
      setInvoiceNo(generatedInvoiceNo);

      const isDuplicateOrder = orderHistory.some(order => order.invoiceNo === generatedInvoiceNo);

      if (!isDuplicateOrder) {
        const order = {
          id: new Date().toISOString(),
          items: cart,
          totalAmount,
          date: currentDate,
          invoiceNo: generatedInvoiceNo,
        };
        addOrder(order);
        console.log('Order added:', order);
      }
    }
  }, [cart, currentDate, totalAmount, addOrder, invoiceNo, orderHistory]);

  // Function to go back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="invoice-page">
      <h1>Invoice</h1>

      <div className="invoice-header">
        <p><strong>Date:</strong> {currentDate}</p>
        {invoiceNo && <p><strong>Invoice No:</strong> #{invoiceNo}</p>}
      </div>

      <div className="invoice-items">
        {cart.map((item) => (
          <div key={item.id} className="invoice-item">
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Quantity:</strong> {item.quantity || 1}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="invoice-total">
        <h2>Total: ${totalAmount.toFixed(2)}</h2>
      </div>

      <div className="thank-you">
        <p>Thank you for shopping with us! 😊🎉</p>
      </div>

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackToHome}>
          Shop More
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
