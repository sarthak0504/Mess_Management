const express = require('express');
const user = require('../model/user');
const manager = require('../model/manager');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
      const { fullName, email, phone, username, password, tokens, managerId } = req.body;
      
      // Create a new user document
      const newUser = new user({
        fullName,
        email,
        phone,
        username,
        password,
        tokens,
        managerId,
      });



      // Save user to database
      const savedUser = await newUser.save();
      const Manager = manager.findById(managerId);
      Manager.userIds.push(savedUser._id);
      await Manager.save(); 
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get all users
router.get('/', async (req, res) => {
    try {
      const users = await user.find().populate('managerId'); // Adjust the fields to populate if needed
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.put('/:id', async (req, res) => {
    try {
      const { fullName, email, phone, username, password, tokens, managerId } = req.body;
      const updatedUser = await user.findByIdAndUpdate(
        req.params.id,
        { fullName, email, phone, username, password, tokens, managerId },
        { new: true }
      );
      
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await user.findByIdAndDelete(req.params.id);

      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      manager.userIds.pull(deletedUser._id);
      await manager.save();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
