const express = require('express');
const router = express.Router();
const MessStatus = require('../model/messStatus'); // Adjust the path as necessary

// POST route to create a new mess status
router.post('/', async (req, res) => {
    try {
        const messStatus = new MessStatus(req.body); // Creates a new mess status instance
        await messStatus.save(); // Saves it to the database
        res.status(201).json({ message: 'Mess status created successfully!', messStatus });
    } catch (error) {
        res.status(400).json({ message: 'Error creating mess status', error });
    }
});

router.get('/',async(req,res)=>{
    try {
        const messStatus = await MessStatus.find(); // Creates a new mess status instance
         // Saves it to the database
        res.json(messStatus);
    } catch (error) {
        res.status(400).json({ message: 'Error creating mess status', error });
    }
})

module.exports = router;
