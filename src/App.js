import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginUser';
import Register from './components/Register';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

