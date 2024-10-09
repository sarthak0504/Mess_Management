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
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the token
          const userId = decodedToken.userId; // Extract the user ID from the token
        
         
          // const response = await api.get(`http://localhost:5000/api/newResident`, 
          const response = await axios.get(`http://localhost:3000/api/user/${userId}`, 
             {
            headers: { Authorization: `Bearer ${token}` }
          });

          setCurrentUser(response.data);  
          
          // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          console.error('Error fetching user:', error);
          // localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchManager = async () => {
      const token = localStorage.getItem('managerToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the token
          const userId = decodedToken.userId; // Extract the user ID from the token
        
         
          // const response = await api.get(`http://localhost:5000/api/newResident`, 
          const response = await axios.get(`http://localhost:3000/api/mess/${userId}`, 
             {
            headers: { Authorization: `Bearer ${token}` }
          });

          setCurrentUser(response.data);  
          
          // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          console.error('Error fetching user:', error);
          // localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchManager();
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
      localStorage.setItem('token',token);
      navigate(`/user`);
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
      localStorage.setItem('managerToken',token);
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
