import React, { useEffect, useState } from 'react';
import { fetchOrderHistory, updateOrderStatus } from '../services/Api'; 
import './WaitersPage.css';

const WaitersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clickedButtons, setClickedButtons] = useState({});

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

    useEffect(() => {
        handleFetchOrderHistory();
    }, []);

    const handleUpdateOrderStatus = async (orderId, status) => {
        setClickedButtons((prev) => ({
            ...prev,
            [orderId]: 'loading',
        }));

        try {
            await updateOrderStatus(orderId, status);

            // Simulate progress for demo purposes
            for (let i = 1; i <= 100; i += 10) {
                setTimeout(() => {
                    setClickedButtons((prev) => ({
                        ...prev,
                        [orderId]: i,
                    }));
                }, i * 100);
            }

            setTimeout(() => {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, status } : order
                    )
                );
                setClickedButtons((prev) => ({
                    ...prev,
                    [orderId]: status,
                }));

                if (status === 'Completed') {
                    setTimeout(() => {
                        setOrders((prevOrders) =>
                            prevOrders.filter((order) => order.id !== orderId)
                        );
                    }, 120000); // 2 minutes delay before removing
                }
            }, 1200); // Delay to simulate processing time
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            // Reset to default state
            setClickedButtons((prev) => ({
                ...prev,
                [orderId]: status,
            }));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="waiters-page">
            <h2>Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <p>
                                <strong>Table:</strong> V-17 (2nd Floor)
                            </p>
                            <p>
                                <strong>Ordered at:</strong>{' '}
                                {new Date(order.created_at).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="order-items">
                            {order.items.map((item) => (
                                <div key={item.product_id} className="order-item">
                                    <img
                                        src={`/images/${item.product_name}.jpg`}
                                        alt={item.product_name}
                                        className="product-image"
                                    />
                                    <div className="order-details">
                                        <h3>{item.product_name}</h3>
                                        <p>
                                            <strong>Quantity:</strong> {item.quantity}x
                                        </p>
                                        <p>
                                            <strong>Price:</strong> ₹ {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-status">
                            <div className="progress-bar">
                                <div
                                    className="bar"
                                    style={{
                                        width: `${
                                            typeof clickedButtons[order.id] === 'number'
                                                ? clickedButtons[order.id]
                                                : 0
                                        }%`,
                                    }}
                                ></div>
                            </div>
                            <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'Processing')}
                                className={`status-btn processing ${
                                    clickedButtons[order.id] === 'Processing' ? 'active' : ''
                                }`}
                            >
                                Processing
                            </button>
                            <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'Completed')}
                                className={`status-btn completed ${
                                    clickedButtons[order.id] === 'Completed' ? 'active' : ''
                                }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WaitersPage;
