// CustomerApp.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductCatalogPage from "./pages/ProductCatalogPage";

function CustomerApp() {
  return (
    <Router>
      <Switch>
        <Route path="/product/login" component={LoginPage} />
        <Route path="/product/productcatalog" component={ProductCatalogPage} />
        {/* Add more routes for signup, product details, etc. */}
      </Switch>
    </Router>
  );
}

export default CustomerApp;
