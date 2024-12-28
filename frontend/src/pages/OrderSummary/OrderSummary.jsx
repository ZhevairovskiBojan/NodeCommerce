import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './OrderSummary.css';

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get('/cart');
        setCartItems(response.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err.response || err.message);
        setError('Failed to load order summary.');
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    try {
      await API.post('/orders/create');
      alert('Order placed successfully!');
      window.location.href = '/order-history';
    } catch (err) {
      console.error('Error placing order:', err.response || err.message);
      setError('Failed to place order.');
    }
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.product._id} className="order-item">
              <p><strong>{item.product.name}</strong> - Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
            </div>
          ))}
          <h3>Total: ${calculateTotal()}</h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      ) : (
        <p>No items to order.</p>
      )}
    </div>
  );
};

export default OrderSummary;
