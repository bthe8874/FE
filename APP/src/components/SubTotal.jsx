import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material"; // Import Material UI components
import { getTotal } from "./cartReducer";

function Subtotal() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleProceedToCheckout = () => {
    const isLoggedIn = localStorage.getItem("user") !== null;
    if (isLoggedIn) {
      if (cart.cart.length === 0) {
        window.alert("Your cart is Empty!");
      } else {
        navigate("/product/order");
      }
    } else {
      alert("Please log in to proceed.");
      navigate("/product/login");
    }
  };

  return (
    <div className="subtotal">
      <div className="subtotal_area">
        <Typography variant="body1">
          Subtotal ({cart.cart.length} items): ${getTotal(cart.cart)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToCheckout}
          disabled={cart.cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Subtotal;
