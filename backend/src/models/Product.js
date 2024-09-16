// models/Product.js
const pool = require('../config/dbConfig');

// Function to get all products
const getAllProducts = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to get product by ID
const getProductById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
