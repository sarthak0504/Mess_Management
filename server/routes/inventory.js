// server/routes/inventory.js
const express = require('express');
const router = express.Router();
const { Category, Item } = require('../model/inventory');

// Get all items and categories
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('category');
    const categories = await Category.find();
    res.json({ items, categories });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory data' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newItem = new Item({ name, description, price, category });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding new item' });
  }
});

// Update an existing item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description, price, category }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});

// Add a new category
router.post('/categories', async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = new Category({ name: category });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Error adding new category' });
  }
});

module.exports = router;
