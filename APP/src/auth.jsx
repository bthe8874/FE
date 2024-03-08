// AuthenticationApp.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductList from "./components/ProductList";
import SignUpPage from "./pages/Register";
import Checkout from "./components/CheckOut";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";
import UserOrdersPage from "./components/UserOrders";
import "./style/navbar.css";

function AuthenticationApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/products">Products</Link>
        {isLoggedIn ? (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/orders" element={<UserOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AuthenticationApp;
