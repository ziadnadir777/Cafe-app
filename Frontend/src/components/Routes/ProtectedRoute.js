import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Or use another method for checking authentication

  if (!token) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return children;  // Allow access if authenticated
};

export default ProtectedRoute;
