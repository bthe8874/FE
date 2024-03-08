import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
        <p>
          Subtotal ({cart.cart.length} items): ${getTotal(cart.cart)}
        </p>
        <button
          onClick={handleProceedToCheckout}
          disabled={cart.cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Subtotal;
