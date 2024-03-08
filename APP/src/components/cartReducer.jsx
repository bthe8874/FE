const initiateState = {
  cart: [],
};

export const getTotal = (cart) => {
  return cart.reduce((amount, item) => parseInt(item.productPrice) + amount, 0);
};

export function cartReducer(state = initiateState, action) {
  switch (action.type) {
    case "Add_Item_to_Cart":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "Remove_Item_From_Cart":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.productID === action.productID
      );
      let newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cannot be deleted!");
      }
      return {
        ...state,
        cart: newCart,
      };
    case "Clear_cart": {
      return initiateState;
    }
    default:
      return state;
  }
}

export default cartReducer;
