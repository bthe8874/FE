import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import "../style/homepage.css";

function HomePage() {
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <div className="homepage-container">
      <div className="welcome-container">
        {userData ? (
          <div>
            <p className="welcome-message">Welcome, {userData.username}!</p>
            {/* Render account details here */}
          </div>
        ) : (
          <div>
            <p className="welcome-message">Please log in to view your account details.</p>
            <Link to="/product/login" className="login-link">Login</Link>
          </div>
        )}
      </div>
      <ProductList />
    </div>
  );
}

export default HomePage;
