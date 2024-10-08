import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [messData, setMessData] = useState([]); // Registered mess data
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch registered mess data on component mount
  useEffect(() => {
    axios.get('/api/mess/all') // Replace with your actual endpoint
      .then(response => {
        setMessData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching mess data:', error);
        setError('Error fetching mess data');
        setLoading(false);
      });
  }, []);

  // Handle search term change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter messes based on search term (search by both name and location)
  const filteredMessData = messData.filter(mess =>
    mess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mess.location.toLowerCase().includes(searchTerm.toLowerCase()) // Search by location
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <section className="py-6">
        

        {/* Search and Add Mess Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search mess by name or location..."
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link to="/admin/RegisterMess">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
              Join with Us
            </button>
          </Link>
        </div>

        {/* Display loading state */}
        {loading && (
          <div className="text-center py-6 text-gray-500">Loading mess data...</div>
        )}

        {/* Display error message */}
        {error && (
          <div className="text-center py-6 text-red-500">{error}</div>
        )}

        {/* Mess List Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-sm font-medium">Mess Name</th>
                  <th className="px-6 py-3 text-sm font-medium">Location</th>
                  <th className="px-6 py-3 text-sm font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessData.length > 0 ? (
                  filteredMessData.map((mess, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4 text-sm">{mess.name}</td>
                      <td className="px-6 py-4 text-sm">{mess.location}</td>
                      <td className="px-6 py-4 text-sm text-center">
                      <Link to="/user/login">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-200">
                          As a User
                        </button>
                        </Link>
                        <Link to="/manager">
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200">
                          As a Manager
                        </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">No registered messes found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
