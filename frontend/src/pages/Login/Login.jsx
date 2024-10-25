import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './Login.css';  

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);  // Save the token
      navigate('/profile');  // Redirect to profile or home page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="input-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Enter your email</label>
        </div>
        
        <div className="input-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Enter your password</label>
        </div>
        
        <div className="forget">
          <label>
            <input type="checkbox" id="remember" />
            <p>Remember me</p>
          </label>
          <a href="#">Forgot password?</a>
        </div>
        
        <button type="submit">Log In</button>

        <div className="register">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
