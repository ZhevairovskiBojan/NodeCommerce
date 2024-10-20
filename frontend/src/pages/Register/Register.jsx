import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', formData);  // No need for full URL
      localStorage.setItem('token', response.data.token);  // Save the token
      navigate('/profile');  // Redirect to profile or home page
    } catch (err) {
      // Log error for debugging
      console.error('Error during registration:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error during registration');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
