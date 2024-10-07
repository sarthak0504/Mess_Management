import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterMess() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Mess name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('/api/mess/register', formData)
        .then((response) => {
          setSuccessMsg(`Mess registered successfully with ID: ${response.data.messId}`);
          setFormData({
            name: '',
            location: '',
            contactPerson: '',
            contactEmail: '',
            contactPhone: '',
            password: '',
            confirmPassword: '',
          });
          setErrors({});
        })
        .catch(error => {
          console.error('Error registering mess:', error.response ? error.response.data : error);
          setErrors({ submit: error.response?.data?.msg || 'Error registering mess' });
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <section className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register a New Mess</h1>

        {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
        {errors.submit && <p className="text-red-600 text-center mb-4">{errors.submit}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mess Name */}
          <div>
            <label className="block text-lg font-semibold mb-2">Mess Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter mess name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Mess Location */}
          <div>
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter mess location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-lg font-semibold mb-2">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              placeholder="Enter contact person's name"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-lg font-semibold mb-2">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              placeholder="Enter contact email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-lg font-semibold mb-2">Contact Phone</label>
            <input
              type="text"
              name="contactPhone"
              placeholder="Enter contact phone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
          </div>

         

          {/* Password */}
          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 focus:ring focus:ring-blue-300"
          >
            Register Mess
          </button>
        </form>
      </section>
    </div>
  );
}
