import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

// This component will protect routes
const UserProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user from AuthContext

  if (!currentUser) {
    // If no current user, redirect to login page
    return <Navigate to="/user/login" />;
  }

  // Otherwise, render the child components (protected content)
  return children;
};

export default UserProtectedRoute;
