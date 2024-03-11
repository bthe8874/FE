import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClearCart } from "../components/cartActions";
import { Typography, Button, List, ListItem, ListItemText } from "@mui/material"; // Import Material UI components
import "../style/orderconfirmation.css";

function Confirmation({ address, products, subtotal }) {
  const dispatch = useDispatch();

  return (
    <div className="confirmation-page">
      <Typography variant="h2">Order Confirmation</Typography>
      <Typography variant="body1">Shipping Address: {address}</Typography>
      <div className="order-details">
        <Typography variant="h3">Order Details</Typography>
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={product.productName}
                secondary={`$${product.productPrice}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <Typography variant="body1">Subtotal: ${subtotal}</Typography>
      <Link to="/product/productcatalog">
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(ClearCart())}
          className="gotoproducts"
        >
          Home Page
        </Button>
      </Link>
    </div>
  );
}

export default Confirmation;
