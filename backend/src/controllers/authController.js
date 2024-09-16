// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Use environment variables for secret and expiration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Default for development
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // Default for development
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // Include role
    // Check if the email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create(username, email, hashedPassword, role);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate a JWT token, include role
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.json({ token, role: user.role }); // Send role with the response
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};
