import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material"; // Import Material UI components
import { useNavigate } from "react-router-dom";
import "../style/userorders.css";

function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null; // Check if userDataString is null
  const userID = userData ? userData.sub : null; // Check if userData is null

  useEffect(() => {
    if (userID) {
      // Check if userID is not null
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
      navigate("/product");
    }
  }, [userID]);

  return (
    <div className="user-orders-container">
      <Typography variant="h4">Your Orders</Typography>
      <div className="orders-list">
        {orders && Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.order_id} className="order-item">
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
            </div>
          ))
        ) : (
          <Typography variant="body1" className="no-orders">No orders found.</Typography>
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
