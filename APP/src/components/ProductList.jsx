import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IMG from "../../img.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { Grid, Typography, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from "./cartActions";
import "../style/productCatalog.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const Cart = useSelector(state => state.cart);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);

  return (
    <div className="products-list">
      <Typography variant="h4" component="h1" gutterBottom>
        
      </Typography>
      <div className="cart-container">
        <div className="cart-icon">
          <Link to="/product/cart" style={{ textDecoration: 'none', color: '#3f51b5' }}>
            <FaShoppingCart style={{ fontSize: "2rem" }} />
            <span style={{ fontWeight: 'bold' }}>{Cart.cart.length}</span>
          </Link>
        </div>
      </div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.products_id} xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              className="product-card"
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            >
              <img
                src={IMG}
                alt={product.productName}
                className="product-image"
              />
              <div className="product-details">
                <Typography variant="h6" gutterBottom>
                  {product.productName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Product Description: {product.productDetail}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Price: ${product.productPrice}
                </Typography>
                <Typography variant="body2">
                  Stock Available: {product.stockAvailable}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(AddToCart(product, IMG))}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
