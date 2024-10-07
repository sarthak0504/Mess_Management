const express = require('express');
const bcrypt = require('bcryptjs');
const Mess = require('../model/RegisteredMess');
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

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
      password: hashedPassword, // Save the hashed password
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

module.exports = router;
