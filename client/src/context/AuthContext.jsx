import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";// Correctly import jwt_decode as default

// Create AuthContext
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email,password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email:email,
        password:password
      });
      const { token } = response.data;
      console.log(token);
      // Decode the JWT to get user ID
      const decodedToken = jwtDecode(token); // Decode using jwt-decode
      const userId = decodedToken.userId;

      const userResponse = await axios.get(`http://localhost:3000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentUser(userResponse.data);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
