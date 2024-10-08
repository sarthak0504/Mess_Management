import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

// This component will protect routes
const ManagerProtectedRoute = ({ children }) => {
  const { currentManager } = useAuth(); // Get current user from AuthContext

  if (!currentManager) {
    // If no current user, redirect to login page
    return <Navigate to="/manager/login" />;
  }

  // Otherwise, render the child components (protected content)
  return children;
};

export default ManagerProtectedRoute;
