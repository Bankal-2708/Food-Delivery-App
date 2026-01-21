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

  const clearCart = () => {
  setCart([]); 
  }
  

  const [searchTerm, setSearchTerm]= useState("");

  const [debounce, setDebounde]=useState("");
  
  useEffect(()=>{

  const timer=setTimeout(()=>{
    setDebounde(searchTerm);
  },500);

  return()=>clearTimeout(timer);
},[searchTerm]);
  
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
    <CartContext.Provider value={{ cart ,clearCart,
      addItemToCart, 
      removeItemFromCart, 
      searchTerm, 
      setSearchTerm,
      debounce }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

