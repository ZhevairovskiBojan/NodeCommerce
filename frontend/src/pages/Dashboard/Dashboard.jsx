import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch both user data and orders in the same useEffect
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await API.get('/user/profile');
        setUser(userResponse.data);

        // Fetch user orders
        const ordersResponse = await API.get('/orders');
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err.response || err.message);
        setError('Failed to load data.');
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="wrapper">
      <div className="dashboard-box">
        <h2>Dashboard</h2>
        {user ? (
          <>
            <div className="welcome-message">
              <p>Welcome, {user.name}!</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>Total Orders: {orders.length}</p>
              {orders.length > 0 && (
                <p>Last Order: {new Date(orders[0].createdAt).toLocaleDateString()}</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
