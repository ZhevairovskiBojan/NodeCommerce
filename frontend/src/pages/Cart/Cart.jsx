import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get('/cart');
        setCartItems(response.data.items || []);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          console.error('Unauthorized: Token might be expired.');
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear invalid token
          window.location.href = '/login'; // Redirect to login
        } else {
          console.error('Error fetching cart:', err.response || err.message);
          setError('Failed to load cart.');
        }
        setLoading(false);
      }
    };
    
    

    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>; // Show loading message
  if (error) return <p className="error-message">{error}</p>; // Show error message

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product?._id || Math.random()} className="cart-item">
            <p><strong>{item.product?.name || 'Unknown Product'}</strong></p>
            <p>Price: ${item.product?.price || '0.00'}</p>
            <p>Quantity: {item.quantity || 0}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
