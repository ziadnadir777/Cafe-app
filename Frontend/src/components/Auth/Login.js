import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService'; // Adjust the path as necessary
import './Login.css'; // Import the corresponding CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        if (response.role === 'admin') {
          navigate('/dashboard'); // Navigate to admin interface
        } else if (response.role === 'waiter') {
          navigate('/waiters'); // Navigate to waiter interface
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please try again.');
    }
  };


  return (
    <div className="login-container">
      <div className="login-image">
        {/* Background image applied via CSS */}
      </div>
      <div className="login-form">
        <span className="active-tab">Sign In</span>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
