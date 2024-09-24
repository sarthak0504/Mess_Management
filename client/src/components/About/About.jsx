import React from 'react'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100">
          {/* Status Section */}
          <section className="py-10 bg-white shadow-md mb-8 text-center">
            <h1 className="text-4xl font-bold">Mess Status</h1>
            <div className="mt-6">
              <p className="text-lg">
                Status: <span className="font-semibold text-green-500">Open</span>
              </p>
              <p className="text-lg mt-2">
                Timings: <span className="font-semibold">12:00 PM - 2:00 PM, 7:00 PM - 9:00 PM</span>
              </p>
            </div>
          </section>
    
          {/* Calendar Section */}
          <section className="py-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Select Date</h2>
            <input
              type="date"
              className="border border-gray-300 px-4 py-2 rounded-md text-lg"
            />
          </section>
    
          {/* Menu Section */}
          <section className="py-12 text-center">
            <h1 className="text-3xl font-bold mb-8">Today's Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Breakfast */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">Breakfast</h2>
                <p className="text-lg text-gray-600 mb-4">7:00 AM - 9:00 AM</p>
                <ul id="breakfast-menu" className="list-none">
                  {/* Breakfast items go here */}
                </ul>
              </div>
    
              {/* Lunch */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">Lunch</h2>
                <p className="text-lg text-gray-600 mb-4">12:00 PM - 2:00 PM</p>
                <ul id="lunch-menu" className="list-none">
                  {/* Lunch items go here */}
                </ul>
              </div>
    
              {/* Dinner */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">Dinner</h2>
                <p className="text-lg text-gray-600 mb-4">7:00 PM - 9:00 PM</p>
                <ul id="dinner-menu" className="list-none">
                  {/* Dinner items go here */}
                </ul>
              </div>
            </div>
          </section>
    
          {/* Admin Section */}
          <section className="max-w-xl mx-auto my-12 p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Customize Menu</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="meal-time" className="block text-lg font-medium mb-2">Meal Time</label>
                <select
                  id="meal-time"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label htmlFor="menu-items" className="block text-lg font-medium mb-2">Menu Items</label>
                <input
                  type="text"
                  id="menu-items"
                  placeholder="Enter menu items separated by commas"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update Menu
              </button>
            </form>
          </section>
        </div>
      );
    };
    
