import React, { createContext, useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage or initialize as empty array
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      // Fetch the product details from the API
      const productToAdd = await productService.getProductById(productId);
      
      if (!productToAdd) {
        throw new Error('Product not found');
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === productId);
        if (existingItem) {
          // Increase quantity if item already exists
          return prevItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item with specified quantity
          return [...prevItems, {
            id: productId,
            name: productToAdd.name,
            image: productToAdd.image,
            price: parseFloat(productToAdd.price),
            quantity: quantity,
            stock: productToAdd.stock,
            inStock: productToAdd.stock > 0
          }];
        }
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // You might want to show an error notification to the user here
      throw error; // Re-throw the error to handle it in the component
    }
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          // Ensure quantity is between 1 and stock limit
          if (newQuantity >= 1 && newQuantity <= (item.stock || Infinity)) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Add logic for shipping, taxes, coupon later
  const total = subTotal; // Placeholder total

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subTotal,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 