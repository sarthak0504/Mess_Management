const express = require('express');
const user = require('../model/user');
const manager = require('../model/manager');
const RegisteredMess = require('../model/RegisteredMess');
const router = express.Router();
const jwt = require('jsonwebtoken');

const generateUserrId = (userId) => {
  const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
  return `${userId}_mgr_${uniqueSuffix}`; // Create managerId based on messId
};

router.post('/', async (req, res) => {
  try {
      const { fullName, email, phone, username, password, messId } = req.body;

      // Find the mess by its name to get the ObjectId
      const mess = await RegisteredMess.findOne({ name: messId }); // Assuming 'name' is the field in your RegisteredMess schema
      
      if (!mess) {
          return res.status(400).json({ message: 'Mess not found' });
      }
    const userId =   generateUserrId(username)

      // Create a new user document
      const newUser = new user({
          fullName,
          email,
          phone,
          username,
          password,
          messId: mess._id, // Use the ObjectId here,
          userId
      });

      // Save user to database
      const savedUser = await newUser.save();
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
  router.get('/:id',async(req,res)=>{
    try {
      const User = await user.findById(req.params.id);
      res.json(User);
    } catch (error) {
      console.log(error);
    }
  })
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
  
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    if (password!==User.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET , { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie('user', user, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.json({ token, user });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


  module.exports = router;
