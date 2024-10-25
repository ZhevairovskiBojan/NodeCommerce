import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/user/profile');
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err.response || err.message);
        setError('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-card">
          <table className="profile-table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Role:</th>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
