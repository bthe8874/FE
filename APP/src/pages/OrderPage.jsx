import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTotal } from "../components/cartReducer";
import "../style/orderpage.css";
import ConfirmationPage from "../components/Confirmation";

function OrderPage() {
  const [address, setAddress] = useState("");
  const cart = useSelector((state) => state.cart);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const time = Date.now();
  const accesstoken = localStorage.getItem("accesstoken");
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      window.alert("Please enter your address.");
      return;
    }

    if (cart.cart.length === 0) {
      window.alert("Your cart is empty. Please add items to your cart.");
      return;
    }

    try {
      const products = cart.cart.map((item) => ({
        productId: item.productID,
        productName: item.productName,
        productPrice: item.productPrice,
        productImg: item.productIMG,
      }));

      const productNames = products
        .map((product) => product.productName)
        .join(", ");

      const response = await axios.post(
        "http://localhost:3001/order/create",
        {
          address: address,
          description: productNames,
          orderValue: getTotal(cart.cart),
          userID: userData.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (response.status === 200) {
        setOrderConfirmed(true);
        window.alert("Order placed successfully:", response.data);
      }
    } catch (error) {
      window.alert("Error placing order:", error);
    }
  };
  if (orderConfirmed) {
    return (
      <ConfirmationPage
        address={address}
        products={cart.cart}
        subtotal={getTotal(cart.cart)}
      />
    );
  }

  return (
    <div className="orders">
      <h1>Order</h1>
      <div className="order-page">
        <h2>Enter Your Address</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="order-details">
            <h3>Order Details</h3>
            <ul>
              {cart.cart.map((item) => (
                <li key={item.productID}>
                  <img src={item.productIMG} alt={item.productName} />
                  <div>
                    <h4>{item.productName}</h4>
                    <p>Price: ${item.productPrice}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="subtotal">Subtotal: ${getTotal(cart.cart)}</p>
          <button type="submit">Confirm Order</button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
