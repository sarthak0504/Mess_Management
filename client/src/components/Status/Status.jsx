import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MessStatusViewer() {
  const [messStatus, setMessStatus] = useState('Closed'); // Track mess status
  const [mealData, setMealData] = useState([]); // Meal timings data

  // Fetch mess status and meal data on component mount
  useEffect(() => {
    axios.get('/api/status') // Fetch current mess status and meals
      .then(response => {
        const { status = 'Closed', meals = [] } = response.data; // Fallback to default values
        setMessStatus(status);
        setMealData(meals);
      })
      .catch(error => {
        console.error('Error fetching mess data:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      {/* Mess Status Section */}
      <section className="py-10 bg-white shadow-md mb-8 text-center rounded-md">
        <h1 className="text-4xl font-bold">Mess Status</h1>
        <div className="mt-6">
          <p className="text-lg">
            Status: 
            <span className={`font-semibold ml-2 ${messStatus === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
              {messStatus}
            </span>
          </p>
        </div>
      </section>

      {/* Meal Times & Menu Section */}
      <section className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Today's Meals</h2>
        
        {/* Meals Wrapper */}
        <div className="flex flex-wrap justify-center gap-6">
          {mealData.length > 0 ? (
            mealData.map((meal, index) => (
              <div 
                key={index} 
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-gray-50 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
              >
                <h3 className="text-xl font-bold mb-2 text-center">Meal Time: {meal.time}</h3>
                <p className="text-lg text-center font-semibold mb-4">Menu Items:</p>

                {/* Items Wrapper (boxed without bullet points) */}
                <div className="flex flex-wrap justify-center gap-2">
                  {meal.items.split(',').map((item, i) => (
                    <div 
                      key={i} 
                      className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-medium min-w-[100px] text-center"
                    >
                      {item.trim()}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500">No meal data available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
