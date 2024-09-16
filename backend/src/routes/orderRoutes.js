const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../config/dbConfig'); // Database configuration

// Protected route (sample)
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Fetch order history
router.get('/history', async (req, res) => {
    try {
        // Fetch the latest 10 orders with associated items and product details
        const [orders] = await db.query(`
            SELECT 
                orders.id AS order_id,
                orders.created_at,
                orders.total,
                orders.status,
                order_items.product_id,
                menu_items.name AS product_name,
                order_items.quantity,
                order_items.price AS item_price
            FROM 
                orders
            LEFT JOIN 
                order_items ON orders.id = order_items.order_id
            LEFT JOIN 
                menu_items ON order_items.product_id = menu_items.id
            ORDER BY 
                orders.created_at DESC
            LIMIT 10
        `);

        // Group items by order_id
        const ordersGrouped = orders.reduce((acc, row) => {
            const { order_id, created_at, total, status, product_id, product_name, quantity, item_price } = row;

            if (!acc[order_id]) {
                acc[order_id] = {
                    id: order_id,
                    created_at,
                    total,
                    status,
                    items: []
                };
            }

            if (product_id) {
                acc[order_id].items.push({
                    product_id,
                    product_name,
                    quantity,
                    price: item_price
                });
            }

            return acc;
        }, {});

        // Convert the grouped orders into an array
        const limitedOrders = Object.values(ordersGrouped);

        res.json(limitedOrders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update order status
router.post('/update-status', async (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ error: 'Order ID and status are required' });
    }

    try {
        const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const [updatedOrder] = await db.query('SELECT status FROM orders WHERE id = ?', [orderId]);

        res.json({ message: 'Order status updated successfully', status: updatedOrder[0].status });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch dashboard data (orders, users, menu items, income)
router.get('/dashboard-data', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT COUNT(*) AS totalOrders FROM orders');
        const [users] = await db.query('SELECT COUNT(*) AS totalUsers FROM users');
        const [menuItems] = await db.query('SELECT COUNT(*) AS totalMenuItems FROM menu_items');

        const [income] = await db.query(`
            SELECT SUM(total) AS totalIncome 
            FROM orders 
            WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) 
            AND YEAR(created_at) = YEAR(CURRENT_DATE())
        `);

        res.json({
            orders: orders[0].totalOrders,
            users: users[0].totalUsers,
            menuItems: menuItems[0].totalMenuItems,
            income: income[0].totalIncome || 0,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Fetch sales figures for line chart
router.get('/sales-figures', async (req, res) => {
    try {
        const [salesData] = await db.query(`
            SELECT 
                MONTH(created_at) AS month, 
                SUM(total) AS totalSales 
            FROM orders 
            WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) 
            GROUP BY MONTH(created_at)
        `);

        const salesByMonth = Array(12).fill(0);
        salesData.forEach(({ month, totalSales }) => {
            salesByMonth[month - 1] = totalSales;
        });

        res.json(salesByMonth);
    } catch (error) {
        console.error('Error fetching sales figures:', error);
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});

// Fetch popular food for doughnut chart
router.get('/popular-food', async (req, res) => {
    try {
        const [popularFood] = await db.query(`
            SELECT menu_items.name AS product_name, COUNT(order_items.product_id) AS totalOrders 
            FROM order_items 
            JOIN menu_items ON order_items.product_id = menu_items.id 
            GROUP BY order_items.product_id 
            ORDER BY totalOrders DESC 
            LIMIT 3
        `);

        const labels = popularFood.map(item => item.product_name);
        const data = popularFood.map(item => item.totalOrders);

        res.json({ labels, data });
    } catch (error) {
        console.error('Error fetching popular food data:', error);
        res.status(500).json({ error: 'Failed to fetch popular food data' });
    }
});

module.exports = router;
