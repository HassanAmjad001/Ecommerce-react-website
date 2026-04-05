import React, { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { getProductById } from "../data/products";


export const CartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]); //{id:2,quality:7}

  function addToCart(productId) {
    const existing = cartItems.find((items) => items.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((items) =>
        items.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : items,
      );

      setcartItems(updatedCartItems);
    } else {
      setcartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function  getCartItemsWithProducts (){

     return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);

  }

  function removeFromCart(productId){
    setcartItems(cartItems.filter((item) => item.id !== productId))
  }

  function updatedQuantity(productId,quantity){
    if(quantity <=0){
      removeFromCart(productId)
      return;
    }
    setcartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }


  function getCartTotal(){

    const total = cartItems.reduce((total,item)=>{
      const product = getProductById(item.id)
      return total + (product ?product.price * item.quantity : 0)
    }, 0)
     return total;
  }

  function clearCart (){
    setcartItems([])
  }

  return <CartContext.Provider value={{cartItems, addToCart,getCartItemsWithProducts,removeFromCart, updatedQuantity,getCartTotal,clearCart}}>{children}</CartContext.Provider>;
};

export default CartProvider;

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
