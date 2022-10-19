import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    if(checkProductInCart) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${qty > 1 ? `${product.name}s` : `${product.name}`} added to the cart.`);
  }

  const toggleCartItemQuanity = (id, value) => {

  }

  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };

  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };

  return (
    <Context.Provider value={{
      showCart, 
      cartItems, 
      totalQuantities, 
      qty, 
      incQty, 
      decQty,
      onAdd,
      setShowCart,
      totalPrice,
      setTotalPrice
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);

