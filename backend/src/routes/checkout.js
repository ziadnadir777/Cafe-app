const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Handle order placement
router.post('/', async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const [result] = await db.query('INSERT INTO orders (total) VALUES (?)', [total]);
        const orderId = result.insertId;

        const orderItems = cartItems.map(item => [orderId, item.id, item.quantity, item.price]);
        await db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', [orderItems]);

        res.status(201).json({ success: true, orderId });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
