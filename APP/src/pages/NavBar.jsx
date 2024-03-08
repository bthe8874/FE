import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href = "/product/login";
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/product">Home</Link>
        </li>
        <li>
          <Link to="/product/productcatalog">Products</Link>
        </li>
        <li>
          <Link to="/product/cart">Cart</Link>
        </li>
        {user ? (
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/product/login">Login</Link>
            </li>
            <li>
              <Link to="/product/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
