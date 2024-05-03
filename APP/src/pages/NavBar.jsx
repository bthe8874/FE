// NavBar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "../style/navbar.css";

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/product/login";
  };

  
  const isLoginOrRegister =
    location.pathname === "/product/login" ||
    location.pathname === "/product/register";

  if (isLoginOrRegister) {
    return null; 
  }

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" component="div" className="store-name">
          My Store
        </Typography>
        <div className="nav-links">
          <Button color="inherit" component={Link} to="/product" className="nav-link">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/product/productcatalog" className="nav-link">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/product/cart" className="nav-link">
            Cart
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/product/orders" className="nav-link">
              User Orders
            </Button>
          )}
        </div>
        {user ? (
          <Button color="inherit" className="logout-btn" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/product/login" className="nav-link">
            SignUp
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
