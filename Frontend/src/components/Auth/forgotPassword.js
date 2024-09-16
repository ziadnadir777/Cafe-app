import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the same CSS for consistency

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle password reset
    console.log('Password reset link sent to:', email);
    // After successful submission, redirect to the login page or show success message
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Background image applied via CSS */}
      </div>
      <div className="login-form">
        <span className="active-tab">Forgot Password</span>
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
          <button type="submit" className="sign-in-button">Reset Password</button>
          <a href="/login" className="forgot-password">Back to Login</a>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
