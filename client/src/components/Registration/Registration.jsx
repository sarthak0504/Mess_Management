import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  const [formData, setFormData] = useState(initialFormData);
 

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
    setShowDetails(true); // Show additional fields when role is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailsChange = (section, field, value) => {
    setFormData({ ...formData, [section]: { ...formData[section], [field]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Filter out unnecessary role details based on the selected role
    const filteredFormData = { ...formData };
    if (formData.role !== 'student') delete filteredFormData.studentDetails;
    if (formData.role !== 'faculty') delete filteredFormData.facultyDetails;
    if (formData.role !== 'manager') delete filteredFormData.managerDetails;
    if (formData.role !== 'staff') delete filteredFormData.staffDetails;

    axios.post('http://localhost:3000/api/user/', filteredFormData)
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">User Role:</label>
            <select
              id="role"
              name="role"
              required
              onChange={handleRoleChange}
              value={formData.role}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Select your role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="manager">Mess Manager</option>
              <option value="staff">Mess Staff</option>
            </select>
          </div>

          
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
