const express = require('express');
const router = express.Router();
const Manager = require('../model/manager'); // Adjust the path based on your directory structure

// Create a new manager
router.post('/managers', async (req, res) => {
  try {
    const { name, email, MessName,  phoneNo, password} = req.body;
    
    // Create a new manager document
    const newManager = new Manager({
      name,
      email,
      MessName,
      phoneNo,
      password,
    });

    // Save the manager to the database
    const savedManager = await newManager.save();
    res.status(201).json(savedManager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all managers
router.get('/managers', async (req, res) => {
    try {
      const managers = await Manager.find().populate('userIds'); // Adjust fields as needed
      res.status(200).json(managers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/managers/:id', async (req, res) => {
    try {
      const manager = await Manager.findById(req.params.id).populate('userIds', 'fullName email phone');
      if (!manager) return res.status(404).json({ message: 'Manager not found' });
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update a manager by ID
router.put('/managers/:id', async (req, res) => {
    try {
      const { name, email, MessName,  phoneNo, password,  } = req.body;
      
      const updatedManager = await Manager.findByIdAndUpdate(
        req.params.id,
        { name, email, MessName,  phoneNo, password, },
        { new: true }
      );
  
      if (!updatedManager) return res.status(404).json({ message: 'Manager not found' });
      res.status(200).json(updatedManager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete a manager by ID
router.delete('/managers/:id', async (req, res) => {
    try {
      const deletedManager = await Manager.findByIdAndDelete(req.params.id);
      if (!deletedManager) return res.status(404).json({ message: 'Manager not found' });
      res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  module.exports = router;