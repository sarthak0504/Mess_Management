const express = require('express');
const router = express.Router();
const MessStatus = require('../model/status');

// Get current mess status and menu
router.get('/', async (req, res) => {
  try {
    const messStatus = await MessStatus.findOne();
    if (!messStatus) {
      return res.status(404).json({ message: 'Mess status not found' });
    }
    res.json(messStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update mess status (open/closed)
router.put('/status', async (req, res) => {
  const { status } = req.body;

  if (!['Open', 'Closed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    let messStatus = await MessStatus.findOne();
    
    if (!messStatus) {
      // Create a new status if it doesn't exist
      messStatus = new MessStatus({ status });
    } else {
      messStatus.status = status;
    }
    
    await messStatus.save();
    res.json({ message: 'Mess status updated', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update meal timings and menu items
router.put('/meals', async (req, res) => {
  const { meals } = req.body;

  if (!meals || !Array.isArray(meals)) {
    return res.status(400).json({ message: 'Meals data is required and should be an array' });
  }

  // Validate meals structure
  for (const meal of meals) {
    if (!meal.time || !meal.items) {
      return res.status(400).json({ message: 'Each meal must have a time and items' });
    }
  }

  try {
    let messStatus = await MessStatus.findOne();
    
    if (!messStatus) {
      // Create a new record with default values if it doesn't exist
      messStatus = new MessStatus({ status: 'Closed', meals });
    } else {
      messStatus.meals = meals;
    }
    
    await messStatus.save();
    res.json({ message: 'Meal timings and items updated', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
