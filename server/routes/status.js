const express = require('express');
const router = express.Router();
const MessStatus = require('../model/status');

// Get current mess status and meals
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
    return res.status(400).json({ message: 'Invalid status. Must be either "Open" or "Closed".' });
  }

  try {
    let messStatus = await MessStatus.findOne();
    
    if (!messStatus) {
      messStatus = new MessStatus({ status });
    } else {
      messStatus.status = status;
    }
    
    await messStatus.save();
    res.json({ message: 'Mess status updated successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add or update meal timings and menu items
router.put('/meals', async (req, res) => {
  const { meals } = req.body;

  if (!meals || !Array.isArray(meals)) {
    return res.status(400).json({ message: 'Meals data is required and should be an array.' });
  }

  for (const meal of meals) {
    if (!meal.time || !meal.items) {
      return res.status(400).json({ message: 'Each meal must have both a time and items.' });
    }
  }

  try {
    let messStatus = await MessStatus.findOne();
    
    if (!messStatus) {
      messStatus = new MessStatus({ status: 'Closed', meals });
    } else {
      messStatus.meals = meals;
    }
    
    await messStatus.save();
    res.json({ message: 'Meals updated successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new meal
router.post('/meals', async (req, res) => {
  const { time, items } = req.body;

  if (!time || !items) {
    return res.status(400).json({ message: 'Meal time and items are required.' });
  }

  try {
    let messStatus = await MessStatus.findOne();
    
    if (!messStatus) {
      messStatus = new MessStatus({ status: 'Closed', meals: [{ time, items }] });
    } else {
      messStatus.meals.push({ time, items });
    }
    
    await messStatus.save();
    res.json({ message: 'Meal added successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a specific meal by index
router.put('/meals/:index', async (req, res) => {
  const { index } = req.params;
  const { time, items } = req.body;

  try {
    let messStatus = await MessStatus.findOne();
    if (!messStatus) {
      return res.status(404).json({ message: 'Mess status not found' });
    }

    if (index < 0 || index >= messStatus.meals.length) {
      return res.status(400).json({ message: 'Invalid meal index.' });
    }

    if (time) messStatus.meals[index].time = time;
    if (items) messStatus.meals[index].items = items;

    await messStatus.save();
    res.json({ message: 'Meal updated successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a meal by index
router.delete('/meals/:index', async (req, res) => {
  const { index } = req.params;

  try {
    let messStatus = await MessStatus.findOne();
    if (!messStatus) {
      return res.status(404).json({ message: 'Mess status not found' });
    }

    if (index < 0 || index >= messStatus.meals.length) {
      return res.status(400).json({ message: 'Invalid meal index.' });
    }

    messStatus.meals.splice(index, 1);
    await messStatus.save();
    res.json({ message: 'Meal removed successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update meal time or items by unique time
router.put('/meals/update/:time', async (req, res) => {
  const { time } = req.params;
  const { newTime, items } = req.body;

  try {
    let messStatus = await MessStatus.findOne();
    if (!messStatus) {
      return res.status(404).json({ message: 'Mess status not found' });
    }

    const meal = messStatus.meals.find((meal) => meal.time === time);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    if (newTime) meal.time = newTime;
    if (items) meal.items = items;

    await messStatus.save();
    res.json({ message: 'Meal updated successfully', status: messStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
