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
      const response = await API.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token);  // Save the token
      navigate('/profile');  // Redirect to profile or home page
    } catch (err) {
      setError('Error during registration');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="input-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Enter your name</label>
        </div>
        
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
        
        <button type="submit">Register</button>

        <div className="register">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
