import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  // Effect to fetch user data (without jwt-decode logic for now)
  useEffect(() => {
    const fetchUser = async () => {
      // Assuming user data is already available or token is not needed
      const response = await axios.get(`http://localhost:5000/api/user`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

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
          <p className="text-gray-600">Access daily and weekly menus with ease.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Thali Token</h2>
          <p className="text-gray-600">Get your meal token digitally, no hassle.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-2">Subscription Plans</h2>
          <p className="text-gray-600">Choose the best meal plan that suits you.</p>
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
