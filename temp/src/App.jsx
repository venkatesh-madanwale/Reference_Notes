import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext.js';
import Mainpage from './shoppingfolder/pages/Mainpage'
import WomenProducts from './shoppingfolder/pages/WomenProducts';
import MenProducts from './shoppingfolder/pages/MenProducts';
import ChildrenProducts from './shoppingfolder/pages/ChildrenProducts';
import Beauty from './shoppingfolder/pages/Beauty';
import { SearchProvider } from './SearchContext.jsx';
import InvoicePage from './shoppingfolder/pages/InvoicePage.jsx';
import Cart from './shoppingfolder/components/Cart'; // adjust the path if needed
import Login from './Login';  

import Signup from './Signup.js';
import OrderHistoryPage from './shoppingfolder/pages/OrderHistoryPage.js';
import { OrderHistoryProvider } from './OrderHistoryContext';
import Wishlist from './shoppingfolder/pages/Wishlist page';
import About from './shoppingfolder/pages/About.jsx';
const App = () => {
  return (
    <Router>
      <SearchProvider>
      <CartProvider>
      <OrderHistoryProvider> 
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/women" element={<WomenProducts />} />
        <Route path="/men" element={<MenProducts />} />
        <Route path="/children" element={<ChildrenProducts />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/order-history" element={<OrderHistoryPage/>}/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </OrderHistoryProvider>
      </CartProvider>
      </SearchProvider>
      
    </Router>
  );
  
}

export default App
