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
  const [currentManager,setCurrentManager]=useState(null);
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
      navigate(`/user/${userId}`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const managerLogin = async(email,password)=>{
    try {
      const response = await axios.post('http://localhost:3000/api/mess/manager/login', {
        email:email,
        password:password
      });
      const { token } = response.data;
      console.log(token);
      // Decode the JWT to get user ID
      const decodedToken = jwtDecode(token); // Decode using jwt-decode
      const userId = decodedToken.userId;

      const userResponse = await axios.get(`http://localhost:3000/api/mess/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentManager(userResponse.data);
      navigate(`/manager/status/${userId}`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const managerLogout = () => {
    localStorage.removeItem('token');
    setCurrentManager(null);
    navigate('/manager/login');
  };
  const userLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/user/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, managerLogin,currentManager,managerLogout,userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
