const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // Import path module for serving the frontend build files

dotenv.config();

// Import route modules
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const checkoutRoutes = require('./routes/checkout');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);  // Handles dashboard, order history, and other order-related routes
app.use('/api/menu', menuRoutes);
app.use('/api/checkout', checkoutRoutes);  // Handles checkout routes

// Serve the frontend React build files (ensure you build your React app first)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Serve the React frontend for all non-API routes
app.use((req, res, next) => {
    if (!req.url.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    } else {
        next();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
