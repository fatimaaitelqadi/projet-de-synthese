import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Client() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    // Clear any previous messages when user starts typing
    if (message) {
      setMessage('');
      setIsSuccess(false);
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log('Registration successful:', response.data);
      
      // Show success message
      setIsSuccess(true);
      setIsError(false);
      setMessage(`Welcome ${response.data.data.name}! Your account has been created successfully.`);
      
      // Store user info if needed
      localStorage.setItem('client_info', JSON.stringify(response.data.data));
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      });
      
      // Redirect to profile page after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (error) {
      setIsSuccess(false);
      setIsError(true);
      
      if (error.response) {
        console.error('Registration failed:', error.response.data);
        
        // Handle validation errors
        if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          setMessage(errorMessages.join(' '));
        } else {
          setMessage(error.response.data.message || 'Registration failed. Please try again.');
        }
      } else {
        console.error('An unexpected error occurred:', error.message);
        setMessage('Connection error. Please try again.');
      }
    }
  };

  return (
    <div className="register-form">
      <h2>Create an Account</h2>
      
      {message && (
        <div className={isSuccess ? "success-message" : isError ? "error-message" : ""}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <button type="submit">Register</button>
      </form>
      
      <div className="form-footer">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
   
    </div>
  );
}

export default Client;