import React, { createContext, useState, useContext } from 'react';

const OrderHistoryContext = createContext();

export const useOrderHistory = () => {
  return useContext(OrderHistoryContext);
};

export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState(
    JSON.parse(localStorage.getItem('orderHistory')) || []
  );

  const addOrder = (order) => {
    const isDuplicate = orderHistory.some(existingOrder => existingOrder.invoiceNo === order.invoiceNo);
    if(!isDuplicate)
    {
    const newOrderHistory = [...orderHistory, order];
    setOrderHistory(newOrderHistory);
    localStorage.setItem('orderHistory', JSON.stringify(newOrderHistory));
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ orderHistory, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
