import { configureStore, ConfigureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartReducer"

export const store = configureStore({
    reducer : {
        cart: cartReducer
    }
});
