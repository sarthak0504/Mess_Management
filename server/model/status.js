const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  items: {
    type: String, // Store menu items as a comma-separated string, or you can use an array of strings
    required: true,
  },
});

const messStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    required: true,
    default: 'Open',
  },
  meals: [mealSchema], // Array of meals
});

const MessStatus = mongoose.model('MessStatus', messStatusSchema , 'meal_status');

module.exports = MessStatus;
