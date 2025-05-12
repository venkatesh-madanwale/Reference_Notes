// src/contexts/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage (or empty array)
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart to localStorage on every change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // New: clear the cart completely
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
