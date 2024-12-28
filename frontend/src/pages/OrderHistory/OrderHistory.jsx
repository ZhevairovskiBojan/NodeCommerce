import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get('/orders');
        setOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err.response || err.message);
        setError('Failed to load orders.');
      }
    };

    fetchOrders();
  }, []);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-history-item">
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <div className="order-items">
              {order.items.map((item) => (
                <p key={item.product._id}>
                  {item.product.name} - Quantity: {item.quantity} - Price: ${item.product.price}
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
