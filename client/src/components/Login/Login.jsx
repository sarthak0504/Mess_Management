import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after login
import axios from 'axios';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your API URL
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/user/login';

    setLoading(true); // Set loading to true before the API call

    axios.post(apiUrl, formData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);

        setFormData({ email: '', password: '' }); // Clear input fields
        navigate('/'); // Navigate to the dashboard or protected route after successful login
      })
      .catch((error) => {
        setError('Invalid email or password');
        console.error('There was an error logging in!', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call
      });
  };

  return (
    <div className="loginpage bg-gray-200 flex justify-center items-center min-h-screen">
      <div className="login-container bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto flex flex-col">
        <h2 className="text-center text-2xl mb-6">Login</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block font-bold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              aria-label="Email address" // Accessibility improvement
              value={formData.email} // Controlled input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block font-bold mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              aria-label="Password" // Accessibility improvement
              value={formData.password} // Controlled input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="form-group text-center">
            <p>Don't have an account? <a href="/registration" className="text-blue-500 hover:underline">Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
