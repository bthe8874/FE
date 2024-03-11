export function AddToCart(product, IMG) {
  return {
    type: "Add_Item_to_Cart",
    item: {
      productID: product.products_id,
      productName: product.productName,
      productPrice: product.productPrice,
      productIMG: IMG,
    },
  };
}

export function RemoveFromCart(productID) {
  return {
    type: "Remove_Item_From_Cart",
  };
}

export function ClearCart() {
  return {
    type: "Clear_cart",
  };
}
