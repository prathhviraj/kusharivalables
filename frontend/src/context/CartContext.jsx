import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('kusharivalables_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kusharivalables_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id && item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          size,
          quantity,
        },
      ]);
    }

    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item._id === productId && item.size === size)
      )
    );
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
