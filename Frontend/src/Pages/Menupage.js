import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import cafenoir from '../assets/cafenoir.jpg'; 
import cafecreme from '../assets/cafecreme.jpg';
import cartIcon from '../assets/cart-icon.png';
import axios from 'axios';

const MenuPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([
        { id: 1, name: "Cafe noir", price: 12, image: cafenoir, description: "Rich, bold, and smooth." },
        { id: 2, name: "Cafe creme", price: 12, image: cafecreme, description: "Creamy and flavorful." },
        // Add more products here
    ]);

    // Fetch products from backend API and load cart from localStorage
    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));

        // Load cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        setCartCount(savedCart.reduce((total, item) => total + item.quantity, 0));
    }, []);

    const handleQuantityChange = (id, change) => {
        setQuantities(prevQuantities => {
            const newQuantity = (prevQuantities[id] || 1) + change;
            return {
                ...prevQuantities,
                [id]: newQuantity > 0 ? newQuantity : 1, // Ensure quantity is at least 1
            };
        });
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        let updatedCart;
        if (existingProductIndex !== -1) {
            updatedCart = cart.map((item, index) => {
                if (index === existingProductIndex) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
        } else {
            const productWithQuantity = { ...product, quantity };
            updatedCart = [...cart, productWithQuantity];
        }
        
        setCart(updatedCart);
        setCartCount(prevCount => prevCount + quantity);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);
        const removedProduct = cart.find(item => item.id === product.id);
        setCart(updatedCart);
        setCartCount(prevCount => prevCount - (removedProduct ? removedProduct.quantity : 0));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <div className="menu-page">
            <header className="header">
                <h1 className="welcome-message">Welcome to Our Cafe!</h1>
            </header>

            <nav className="banner">
                <Link to="/login" className="menu-link">Login</Link>
                <Link to="/menu" className="menu-link">Menu</Link>
                <Link to="/order-history" className="menu-link">Order History</Link> 
                
                <div onClick={handleCartClick} className="cart-icon-wrapper">
                    <img src={cartIcon} alt="Cart" className="cart-icon" />
                    {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                    )}
                </div>
            </nav>

            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image"/>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">MAD {product.price}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="product-actions">
                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                    <span className="quantity-display">{quantities[product.id] || 1}</span>
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                </div>
                                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add</button>
                                <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(product)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer">
                &copy; 2024 Our Cafe. All rights reserved.
            </footer>
        </div>
    );
};

export default MenuPage;
