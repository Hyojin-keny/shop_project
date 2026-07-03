import { createContext, useContext, useState } from 'react';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [justAdded, setJustAdded] = useState(false);

  const addToCart = (product, size, color) => {
    setCartItems(prev => [...prev, { ...product, size, color }]);
    setJustAdded(true);
  };

  const resetCartMessage = () => setJustAdded(false);
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, justAdded, resetCartMessage }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);