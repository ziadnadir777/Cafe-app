import React, { useState, useEffect } from 'react';
import { placeOrder } from '../services/Api'; // Import the placeOrder function
import '../index.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const updateQuantity = (id, delta) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return {
                    ...item,
                    quantity: Math.max(newQuantity, 0) // Avoid negative quantities
                };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.quantity > 0 ? item.price * item.quantity : 0);
        }, 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            const order = { cartItems };
            console.log('Order to be sent:', order); // Debugging line
            const response = await placeOrder(order);
    
            if (response.success) {
                alert('Order placed successfully!');
                setCartItems([]);
                localStorage.removeItem('cart');
            } else {
                alert(`Failed to place order: ${response.message}`);
            }
        } catch (err) {
            console.error('Error during checkout:', err);
            alert('Error during checkout');
        }
    };

    return (
        <div className="cart-page">
            <div className="cart-items">
                <h2>Shopping Bag</h2>
                <p>{cartItems.length} items in your bag.</p>
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                            </div>
                            <div className="cart-item-price">
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                <button className="remove-item-button" onClick={() => removeItem(item.id)}>X</button>
                            </div>
                            <div className="cart-item-total">
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="cart-summary">
                <div className="cart-summary-details">
                    <h3>Order Summary</h3>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="summary-item">
                                {item.name} x {item.quantity} @ ${item.price.toFixed(2)} each
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary-total">
                        <p>Total</p>
                        <h3>${calculateTotal()}</h3>
                    </div>
                </div>
                <div className="cart-actions">
                    <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    <button className="cancel-button" onClick={() => setCartItems([])}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
