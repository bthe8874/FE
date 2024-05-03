import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";
import "../style/userorders.css";

function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null; 
  const userID = userData ? userData.sub : null; 

  useEffect(() => {
    if (userID) {
      
      axios
        .get(`http://localhost:3001/order/get/${userID}`)
        .then((response) => {
          console.log("Response data:", response.data);
          console.log("userid",userID);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          window.alert("Error fetching the order!");
        });
    } else {
      window.alert("User not confirmed. Please confirm your account.");
    navigate("/product");
    }
  }, [userID]);

  const getRandomColor = () => {
    const colors = ["#F48FB1", "#B39DDB", "#4FC3F7", "#81C784", "#FFD54F"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="user-orders-container">
      <Typography variant="h4" gutterBottom>Your Orders</Typography>
      <div className="orders-list">
        {orders && Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.order_id}
              elevation={3}
              className="order-item"
              style={{ backgroundColor: getRandomColor() }}
            >
              <div className="order-info">
                <Typography variant="body1">
                  <strong>Order ID:</strong> {order.order_id}
                </Typography>
                <Typography variant="body1">
                  <strong>Description:</strong> {order.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {order.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Order Value:</strong> ${order.orderValue}
                </Typography>
              </div>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" className="no-orders">No orders found.</Typography>
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
