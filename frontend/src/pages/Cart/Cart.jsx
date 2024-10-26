import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Cart.css';  

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get('/cart');
        setCartItems(response.data.items);
      } catch (err) {
        console.error('Error fetching cart:', err.response || err.message);
        setError('Failed to load cart.');
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await API.put('/cart/update', { productId, quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err.response || err.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await API.delete('/cart/remove', { data: { productId } });
      setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err.response || err.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {error && <p className="error-message">{error}</p>}
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product._id} className="cart-item">
              <p><strong>{item.product.name}</strong></p>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                />
              </p>
              <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
          </div>
          <button onClick={() => window.location.href = "/checkout"}>Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
