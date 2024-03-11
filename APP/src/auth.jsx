import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginPage from "./pages/LoginPage";
import ProductList from "./components/ProductList";
import SignUpPage from "./pages/Register";
import Checkout from "./components/CheckOut";
import OrderPage from "./pages/OrderPage";
import HomePage from "./pages/HomePage";
import UserOrdersPage from "./components/UserOrders";
import NavBar from "./pages/NavBar";
import "./style/navbar.css";
import "./style/transition.css"; 

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
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/product" element={<HomePage />} />
        <Route
          path="/product/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/product/productcatalog" element={<ProductList />} />
        <Route path="/product/register" element={<SignUpPage />} />
        <Route path="/product/order" element={<OrderPage />} />
        <Route path="/product/cart" element={<Checkout />} />
        <Route path="/product/orders" element={<UserOrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AuthenticationApp;
