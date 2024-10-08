const express = require('express');
const bcrypt = require('bcryptjs');
const Mess = require('../model/RegisteredMess');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Function to generate messId
const generateMessId = (messName) => {
  const cleanedName = messName.toLowerCase().replace(/\s+/g, '');
  const uniqueSuffix = Date.now().toString(); 
  return `${cleanedName}_${uniqueSuffix}`;
};

// Function to generate managerId
const generateManagerId = (messId) => {
  const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
  return `${messId}_mgr_${uniqueSuffix}`; // Create managerId based on messId
};

// @route   POST /api/mess/register
// @desc    Register a new mess
// @access  Public
router.post('/register', async (req, res) => {
  const { name, location, contactPerson, contactEmail, contactPhone, password, confirmPassword } = req.body;

  // Basic Validation
  if (!name || !location || !contactPerson || !contactEmail || !contactPhone || !password || !confirmPassword ) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    // Check if mess with this email already exists
    let mess = await Mess.findOne({ contactEmail });
    if (mess) {
      return res.status(400).json({ msg: 'Mess already registered with this email' });
    }

  

    // Generate unique messId
    const messId = generateMessId(name);

    // Generate managerId based on messId
    const managerId = generateManagerId(messId);

    // Create new mess instance
    const newMess = new Mess({
      name,
      location,
      messId,
      contactEmail,
      contactPerson,
      contactPhone,
      password, // Save the hashed password
      managerId, // Assign generated managerId
    });

    // Save the mess to the database
    await newMess.save();

    res.status(201).json({ 
      msg: 'Mess registered successfully', 
      messId: newMess.messId, 
      managerId: newMess.managerId // Also return the managerId
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// Route to get all registered messes
router.get('/all', async (req, res) => {
  try {
    const messes = await Mess.find();
    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
});

router.get('/:messId',async(req,res)=>{
  try {
    const messes = await Mess.findById(req.params.messId);
    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
})
router.post('/manager/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Mess.findOne({ contactEmail:email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    
    if (password!== user.password) {
      return res.status(400).json({ message: 'incorrect password credenpatials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.cookie('user', user, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.json({ token, user });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


module.exports = router;
