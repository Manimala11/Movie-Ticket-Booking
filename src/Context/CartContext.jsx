import React from "react";

const CartContext = React.createContext(
   { count: 0, 
  cartItem: [], 
  addToCart: () => {}, 
  removeFromCart: ()=>{}
   }
);

export default CartContext;

