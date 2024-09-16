const express = require('express');
const { signup, login } = require('../controllers/authController');
const User = require('../models/User'); // Make sure this import is used if needed
const router = express.Router();

// Route to get all users (ensure User.findAll exists)
router.get('/users', async (req, res) => {
  try {
    // Check if the User model has a findAll method
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a user by ID (ensure User.findById exists)
router.get('/users/:id', async (req, res) => {
  try {
    // Check if the User model has a findById method
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

module.exports = router;
