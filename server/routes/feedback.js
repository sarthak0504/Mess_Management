const express = require('express');
const router = express.Router();
const Feedback = require('../model/feedback'); // Assuming you have a Feedback model

// Route to submit feedback
router.post('/submit', async (req, res) => {
//   const { category, rating, feedback} = req.body; // Assuming userId is passed along with the feedback
  const { category, rating, feedback, userId } = req.body; // Assuming userId is passed along with the feedback
console.log(req.body);
  if (!category || !rating || !feedback) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFeedback = new Feedback({
      userId,
      category,
      rating,
      feedback,
      submittedAt: new Date(),
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Route to get all feedback (optional for admin view)
router.get('/all', async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

module.exports = router;