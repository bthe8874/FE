import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import AuthenticationApp from "./auth";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: () => (
    <Provider store={store}>
      <AuthenticationApp />
    </Provider>
  ),

  errorBoundary(err, info, props) {
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>We're sorry, but an error occurred:</p>
        <p>{err.message}</p>
        <p>Component Stack:</p>
        <pre>{info.componentStack}</pre>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
