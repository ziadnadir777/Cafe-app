import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../services/Api'; // Import API functions
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the latest order history
    const handleFetchOrderHistory = async () => {
        setLoading(true);
        try {
            const history = await fetchOrderHistory();
            if (Array.isArray(history)) {
                setOrders(history);
            } else {
                setError('Invalid data format.');
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
            setError('Failed to fetch order history.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch order history on component mount
    useEffect(() => {
        handleFetchOrderHistory();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="order-history-page">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <p><strong>Order Number:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {new Date(order.created_at).toLocaleTimeString()}</p>
                            <p><strong>Total Amount:</strong> ${!isNaN(parseFloat(order.total)) ? parseFloat(order.total).toFixed(2) : 'N/A'}</p>
                        </div>
                        <div className="order-items">
                            {order.items.map(item => (
                                <div key={item.product_id} className="order-item">
                                    <p><strong>Product:</strong> {item.product_name}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
                                    <p><strong>Total:</strong> ${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <p><strong>Status:</strong> {order.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistoryPage;
