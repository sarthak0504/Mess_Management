import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManagerStatus() {
  const [messStatus, setMessStatus] = useState('Open'); // Track mess status
  const [mealData, setMealData] = useState([]); // Initialize mealData as an empty array

  // Fetch current mess status and meals on component mount
  useEffect(() => {
    axios.get('/api/status')
      .then(response => {
        const { status = 'Open', meals = [] } = response.data; // Fallback to 'Open' and empty array
        setMessStatus(status);
        setMealData(meals);
      })
      .catch(error => {
        console.error('Error fetching mess data:', error);
      });
  }, []);

  // Function to handle mess status toggle
  const toggleMessStatus = () => {
    const updatedStatus = messStatus === 'Open' ? 'Closed' : 'Open';
    setMessStatus(updatedStatus);

    axios.put('/api/status/status', { status: updatedStatus })
      .then(() => {
        console.log('Mess status updated');
      })
      .catch(error => {
        console.error('Error updating mess status:', error);
      });
  };

  // Function to handle adding new meal inputs
  const addMeal = () => {
    setMealData([...mealData, { time: '', items: '' }]);
  };

  // Function to handle removing a meal
  const removeMeal = (index) => {
    const updatedMealData = mealData.filter((_, i) => i !== index);
    setMealData(updatedMealData);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('/api/status/meals', { meals: mealData })
      .then(() => {
        alert('Meal timings and items updated successfully!');
      })
      .catch(error => {
        console.error('Error updating meals:', error);
      });
  };

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedMealData = [...mealData];
    updatedMealData[index][field] = value;
    setMealData(updatedMealData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mess Status Section */}
      <section className="py-10 bg-white shadow-md mb-8 text-center">
        <h1 className="text-4xl font-bold">Mess Status</h1>
        <div className="mt-6">
          <p className="text-lg">
            Status: 
            <span className={`font-semibold ml-2 ${messStatus === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
              {messStatus}
            </span>
          </p>
          <button 
            onClick={toggleMessStatus}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Toggle Mess Status
          </button>
        </div>
      </section>

      {/* Meal Times & Menu Section */}
      <section className="max-w-xl mx-auto my-12 p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Manage Meal Timings and Menu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mealData.map((meal, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-md bg-white shadow-sm">
              {/* Meal Time Input */}
              <div>
                <label htmlFor={`meal-time-${index}`} className="block text-lg font-medium mb-2">
                  Meal Time
                </label>
                <input
                  type="text"
                  id={`meal-time-${index}`}
                  placeholder="Enter meal time"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  value={meal.time}
                  onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                />
              </div>

              {/* Menu Items Input */}
              <div>
                <label htmlFor={`menu-items-${index}`} className="block text-lg font-medium mb-2">
                  Menu Items
                </label>
                <input
                  type="text"
                  id={`menu-items-${index}`}
                  placeholder="Enter menu items separated by commas"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  value={meal.items}
                  onChange={(e) => handleInputChange(index, 'items', e.target.value)}
                />
              </div>

              {/* Remove Meal Button */}
              {mealData.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMeal(index)}
                  className="text-red-600 mt-2 hover:underline"
                >
                  Remove Meal
                </button>
              )}
            </div>
          ))}

          {/* Add New Meal Time Button */}
          <button
            type="button"
            onClick={addMeal}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Add Another Meal Time
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update Mess Information
          </button>
        </form>
      </section>
    </div>
  );
}
