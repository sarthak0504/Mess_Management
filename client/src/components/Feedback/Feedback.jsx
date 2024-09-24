import React, { useState } from 'react';
import axios from 'axios';


const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission (send feedback, category, rating to the backend)
    console.log({ feedback, category, rating });
    setSubmitted(true);
  };

  const handleRatingChange = (rate) => {
    setRating(rate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Feedback</h2>
        {submitted ? (
          <div className="text-green-600 text-center">
            <p>Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                Category:
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="foodQuality">Food Quality</option>
                <option value="service">Service</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-semibold text-gray-700">
                Rating:
              </label>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <span
                    key={rate}
                    className={`cursor-pointer text-2xl ${
                      rating >= rate ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingChange(rate)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700">
                Feedback:
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
