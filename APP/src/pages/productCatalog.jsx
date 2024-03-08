// ProductCatalogApp.jsx
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductListPage from "./components/ProductList";

function ProductCatalogApp() {
  return (
    <Router>
      <Route path="/" component={ProductListPage} />
    </Router>
  );
}

export default ProductCatalogApp;
