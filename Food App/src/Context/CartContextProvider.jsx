import { useState, useEffect } from "react";
import { CartContext } from "./cartContext";



const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  
  const addItemToCart = (item) => {
  setCart(prev =>
    prev.some(cartItem => cartItem.id === item.id)
      ? prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      : [...prev, { ...item, count: 1 }]
  );
};


  // const addItemToCart = (item) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  //     if (existingItem) {
  //       return prevCart.map((cartItem) =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, count: cartItem.count + 1 }
  //           : cartItem
  //       );
  //     }
  //     return [...prevCart, { ...item, count: 1 }];
  //   });
  // };




  const removeItemFromCart = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((cartItem) =>
          cartItem.id === id && cartItem.count > 0
            ? { ...cartItem, count: cartItem.count - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.count > 0); 
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

