import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IMG from "../../img.jpg";
import "../style/productCatalog.css";
import {useDispatch, useSelector} from 'react-redux';
import {AddToCart} from "./cartActions";

function ProductList() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const Cart = useSelector(state => state.cart);
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        window.alert("Error fetching products:", error.message)
      );
  }, []);

  return (
    <div className="products-list">
      <h1>Product Catalog</h1>
      <div className="cart-icon">
        <Link to="/cart">
          <span>Cart<strong>{Cart.cart.length}</strong></span>
          
        </Link>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
            <img
              src={IMG}
              alt={product.productName}
              className="product-image"
            />
            <div className="productdetails">
              <h2>{product.productName}</h2>

              <p>Product Description: {product.productDetail}</p>
              <p>Price: ${product.productPrice}</p>
              <p>Stock Available: {product.stockAvailable}</p>
            </div>
            <button
              className="btn-primary"
              onClick={() => dispatch(AddToCart(product,IMG))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
