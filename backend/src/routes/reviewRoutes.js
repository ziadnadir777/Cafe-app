// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database connection

// POST route to add a review
router.post('/reviews', async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await db.query('INSERT INTO reviews (product_id, rating, comment) VALUES (?, ?, ?)', [productId, rating, comment]);
    res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error. Please try again later.' });
  }
});
// Route to get product details by ID
router.get('/products/:productId', getProductById);

// Route to submit a review
router.post('/reviews', submitReview);

module.exports = router;
