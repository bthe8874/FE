import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTotal } from "../components/cartReducer";
import { Typography, TextField, Button, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material"; // Import Material UI components
import ConfirmationPage from "../components/Confirmation";
import { useDispatch } from 'react-redux';
import { ClearCart } from "../components/cartActions";

function OrderPage() {
  const [address, setAddress] = useState("");
  const cart = useSelector((state) => state.cart);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const accesstoken = localStorage.getItem("accesstoken");
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null; 
  const userID = userData ? userData.sub : null; 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
  e.preventDefault();

  
  if (!userID) {
    window.alert("User ID not found. Please log in or sign up.");
    return;
  }

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
      <Typography variant="h4" gutterBottom>
      
      </Typography>
      <div className="order-page">
        <Typography variant="h5" gutterBottom>Enter Your Address</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <div className="order-details">
            <Typography variant="h6" gutterBottom>Order Details</Typography>
            <List>
              {cart.cart.map((item) => (
                <ListItem key={item.productID}>
                  <ListItemAvatar>
                    <Avatar src={item.productIMG} alt={item.productName} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.productName}
                    secondary={`Price: $${item.productPrice}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <Typography variant="subtitle1" className="subtotal">
            Subtotal: ${getTotal(cart.cart)}
          </Typography>
          <Button variant="contained" color="primary" type="submit" 
          >
            Confirm Order
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
