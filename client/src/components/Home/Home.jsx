import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook
import axios from 'axios'; // Make sure to import axios

const Home = () => {
  const { currentUser } = useAuth(); 
  const [foodItems, setFoodItems] = useState([]); // State to hold food items

  // Fetch food items when the component mounts
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messStatus');
        // Extract the food array from the response (assuming you want the first object)
        const foodArray = response.data.length > 0 ? response.data[0].food : [];
        setFoodItems(foodArray); // Set the food items state
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFood(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat h-96 w-full text-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url('https://via.placeholder.com/1500x500')` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black">Welcome to the DH Management System</h1>
        <p className="text-lg md:text-xl text-black mt-4">Manage your dining experience effortlessly.</p>
        <a
          href="/registration"
          className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="mt-10 mb-10 flex flex-wrap justify-center gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">View Menu</h2>
          <ul className="text-gray-600">
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <li key={index}>{item}</li> // Map over the food array and display each item
              ))
            ) : (
              <li>No food available</li> // Fallback if no food items are available
            )}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Thali Token</h2>
          <h2 className="text-xl font-semibold mb-2">Your Tokens: {currentUser.tokens}</h2>
          <p className="text-gray-600">Get your meal token digitally, no hassle.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Subscription Plans</h2>
          <h2 className="text-xl font-semibold mb-2">You have 1 month Plan</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Feedback</h2>
          <p className="text-gray-600">Share your dining experience with us.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
