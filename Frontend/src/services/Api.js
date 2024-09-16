import axios from 'axios';

// Hardcoded API URLs
const API_URL_PLACE_ORDER = 'http://localhost:5000/api/checkout';
const API_URL_ORDER_HISTORY = 'http://localhost:5000/api/orders/history';
const API_URL_UPDATE_STATUS = 'http://localhost:5000/api/orders/update-status';
const API_URL_DASHBOARD_DATA = 'http://localhost:5000/api/orders/dashboard-data';
const API_URL_SALES_FIGURES = 'http://localhost:5000/api/orders/sales-figures';
const API_URL_POPULAR_FOOD = 'http://localhost:5000/api/orders/popular-food';
const API_URL = 'http://localhost:5000/api/menu';  // Base URL for menu API

// Function to place an order
export const placeOrder = async (order) => {
    try {
        const response = await axios.post(API_URL_PLACE_ORDER, order, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch order history
export const fetchOrderHistory = async () => {
    try {
        const response = await axios.get(API_URL_ORDER_HISTORY);

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching order history:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.post(API_URL_UPDATE_STATUS, { orderId, status });

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch dashboard data
export const fetchDashboardData = async () => {
    try {
        const response = await axios.get(API_URL_DASHBOARD_DATA);

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch sales figures for line chart
export const fetchSalesFigures = async () => {
    try {
        const response = await axios.get(API_URL_SALES_FIGURES);

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching sales figures:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch popular food data for doughnut chart
export const fetchPopularFoodData = async () => {
    try {
        const response = await axios.get(API_URL_POPULAR_FOOD);

        if (typeof response.data !== 'object') {
            throw new Error('Invalid response format: expected JSON');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching popular food data:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// Fetch all menu items
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

// Create a new menu item
export const createMenuItem = async (menuItem) => {
  try {
    const response = await axios.post(API_URL, menuItem);
    return response.data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
};

// Update an existing menu item
export const updateMenuItem = async (id, menuItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, menuItem);
    return response.data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

// Delete a menu item
export const deleteMenuItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};