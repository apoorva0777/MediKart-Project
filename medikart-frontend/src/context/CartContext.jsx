import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import BASE_URL from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      console.log('Fetching cart with token:', user.token);
      const response = await fetch(`${BASE_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      });
      console.log('Cart fetch response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCartItems(
        data.items
          .filter(item => item.product !== null)
          .map(item => ({
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
          }))
      );
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify({ productId: product.id || product._id, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      await fetchCart();
      alert(product.name + ' added to cart');
    } catch (error) {
      alert('Error adding item to cart: ' + error.message);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!user) {
      alert('Please login to update cart');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
      const data = await response.json();
      setCartItems(
        data.items
          .filter(item => item.product !== null)
          .map(item => ({
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
          }))
      );
    } catch (error) {
      alert('Error updating cart: ' + error.message);
    }
  };

  const clearCart = async () => {
    if (!user) {
      alert('Please login to clear cart');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }
      setCartItems([]);
    } catch (error) {
      alert('Error clearing cart: ' + error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItem, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
