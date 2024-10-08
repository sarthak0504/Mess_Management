import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    messId: '', // Add a field for selected mess
  };
  
  const [mess, setMess] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [showDetails, setShowDetails] = useState(false); // Manage additional details visibility

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/mess/all');
        setMess(response.data); // Set fetched mess data
      } catch (error) {
        console.error('There was an error fetching the mess data!', error);
      }
    };

    fetchMess();
  }, []);

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
    setShowDetails(true); // Show additional fields when role is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Prepare data for submission
    const dataToSubmit = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      password: formData.password,
      messId: formData.messId, // Include selected mess ID
    };

    axios.post('http://localhost:3000/api/user/', dataToSubmit)
      .then((response) => {
        alert('Registration successful');
        setFormData(initialFormData); // Reset form after successful registration
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              onChange={handleChange}
              value={formData.fullName}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              onChange={handleChange}
              value={formData.phone}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={handleChange}
              value={formData.username}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Select dropdown for mess */}
          <div className="mb-4">
            <label htmlFor="messId" className="block text-sm font-semibold text-gray-700">Select Mess:</label>
            <select
              id="messId"
              name="messId"
              required
              onChange={handleChange}
              value={formData.messId}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a mess</option>
              {mess.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} {/* Replace with appropriate property for display */}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
