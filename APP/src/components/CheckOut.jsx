import React from "react";
import { useSelector } from "react-redux";
import "../style/checkout.css";
import Subtotal from "./SubTotal";
import {useDispatch} from 'react-redux';
import {RemoveFromCart} from "./cartActions";

function CheckOut() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="checkout">
            <h1>Your Cart</h1>
            <div className="checkout_item">
                {cart.cart.map(item => {
                    return (
                        <div className="checkout_product" key={item.productID}>
                            <img src={item.productIMG} alt={item.productName} />
                            <div className="product_info">
                                <h4>{item.productName}</h4>
                                <p>${item.productPrice}</p>
                                <button onClick={() => dispatch(RemoveFromCart(item.productID))}>Remove from the Cart</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="subtotal">
                <Subtotal/>
            </div>
        </div>
    );
}

export default CheckOut;
