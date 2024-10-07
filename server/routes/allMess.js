const express = require('express');
const Mess = require('../model/RegisteredMess');
const router = express.Router();

// Route to get all registered messes
router.get('/all', async (req, res) => {
  try {
    const messes = await Mess.find();
    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
});

module.exports = router;
