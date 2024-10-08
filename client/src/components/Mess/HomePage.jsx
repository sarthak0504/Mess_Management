import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-blue-700">
          Welcome to Your Mess Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Streamline your mess experience. Check real-time mess status, browse menus, order food, and subscribe to meal plans with just a click!
        </p>

        <Link to="/admin/mess" className="inline-block mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
          Go to Mess Page
        </Link>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Current Mess Status */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Current Mess Status</h2>
          <p className="text-md leading-relaxed">
            Know the real-time status of your mess – whether it’s open or closed.
          </p>
        </div>

        {/* Today's Mess Menu */}
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Today's Mess Menu</h2>
          <p className="text-md leading-relaxed">
            Discover today's menu and select your favorite dishes from the list.
          </p>
        </div>

        {/* Menu Inventory */}
        <div className="bg-gradient-to-r from-purple-400 to-red-400 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Menu Inventory</h2>
          <p className="text-md leading-relaxed">
            Browse through our menu inventory and place your order quickly.
          </p>
        </div>

        {/* Subscriptions */}
        <div className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Subscriptions & Tokens</h2>
          <p className="text-md leading-relaxed">
            Purchase meal tokens or subscribe to daily/weekly meal plans at your convenience.
          </p>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
        {/* Feedback Section */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-900 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <p className="text-md leading-relaxed">
            We value your feedback! Let us know your thoughts to improve your experience.
          </p>
        </div>

        {/* Event Planning (Example of another feature) */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg rounded-xl p-6 transform transition hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Event Planning</h2>
          <p className="text-md leading-relaxed">
            Plan and manage mess events seamlessly with our event planning tools.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
