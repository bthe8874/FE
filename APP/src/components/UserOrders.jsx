import axios from "axios";
import React, { useState, useEffect } from "react";
import "../style/userorders.css";
import { useNavigate } from "react-router-dom";

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
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          window.alert("Error fetching the order!");
        });
    } else {
      navigate("/");
    }
  }, [userID]);

  return (
    <div className="user-orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders && Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.order_id} className="order-item">
              <div className="order-info">
                <strong>Order ID:</strong> {order.order_id}
                <br />
                <strong>Description:</strong> {order.description}
                <br />
                <strong>Address:</strong> {order.address}
                <br />
                <strong>Order Value:</strong> ${order.orderValue}
                <br />
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">No orders found.</div>
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
