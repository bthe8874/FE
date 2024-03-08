import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

function HomePage() {
  const userDataString = localStorage.getItem("user");

  if (!userDataString || userDataString.trim() === "") {
    return (
      <div>
        <p>Please log in to view your account details.</p>
        <Link to="/login">Login</Link>
        <ProductList />
      </div>
    );
  }

  const userData = JSON.parse(userDataString);

  return (
    <div>
      <p>Welcome, {userData.username}!</p>
      {/* Render account details here */}

      <ProductList />
    </div>
  );
}

export default HomePage;
