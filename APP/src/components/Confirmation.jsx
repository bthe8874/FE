import "../style/orderconfirmation.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ClearCart } from "../components/cartActions";

function Confirmation({ address, products, subtotal }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="confirmation-page">
        <h2>Order Confirmation</h2>
        <p>Shipping Address: {address}</p>
        {/* <p>Order Date: {timestamp}</p> */}
        <div className="order-details">
          <h3>Order Details</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <p>
                  {product.productName}: ${product.productPrice}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p>Subtotal: ${subtotal}</p>
        <Link to="/product/productcatalog">
          <button
            className="gotoproducts"
            onClick={() => dispatch(ClearCart())}
          >
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
