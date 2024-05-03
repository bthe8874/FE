import React from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material"; 
import "../style/checkout.css";
import Subtotal from "./SubTotal";
import { useDispatch } from 'react-redux';
import { RemoveFromCart } from "./cartActions";

function CheckOut() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="checkout">
            <Typography variant="h4" component="h1" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={2} className="checkout_item">
                {cart.cart.map(item => (
                    <Grid item key={item.productID} xs={12}>
                        <div className="checkout_product">
                            <img src={item.productIMG} alt={item.productName} />
                            <div className="product_info">
                                <Typography variant="h6" gutterBottom>
                                    {item.productName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    ${item.productPrice}
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={() => dispatch(RemoveFromCart(item.productID))}>
                                    Remove from Cart
                                </Button>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <div className="subtotal">
                <Subtotal />
            </div>
        </div>
    );
}

export default CheckOut;
