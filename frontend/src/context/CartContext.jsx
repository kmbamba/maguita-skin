import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('maguita-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('maguita-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (gamme) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === gamme._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === gamme._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...gamme, quantity: 1 }];
    });
  };

  const removeFromCart = (gammeId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== gammeId));
  };

  const updateQuantity = (gammeId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gammeId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === gammeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.isPromoActive ? item.promoPrice : item.regularPrice;
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
