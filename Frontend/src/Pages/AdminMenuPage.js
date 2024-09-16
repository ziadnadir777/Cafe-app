import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import cartIcon from '../assets/cart-icon.png';
import axios from 'axios';

const AdminMenuPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });

    useEffect(() => {
        // Fetch products from the backend
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price && newProduct.description && newProduct.image) {
            axios.post('http://localhost:5000/api/products', newProduct)
                .then(response => {
                    setProducts([...products, response.data]);
                    setNewProduct({ name: '', price: '', description: '', image: '' });
                })
                .catch(error => console.error('Error adding product:', error));
        }
    };

    const handleRemoveProduct = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => console.error('Error removing product:', error));
    };

    const handlePriceChange = (id, newPrice) => {
        axios.put(`http://localhost:5000/api/products/${id}`, { price: newPrice })
            .then(response => {
                setProducts(products.map(product => 
                    product.id === id ? { ...product, price: response.data.price } : product
                ));
            })
            .catch(error => console.error('Error updating price:', error));
    };

    return (
        <div className="admin-menu-page">
            <header className="header">
                <h1>Admin Menu Page</h1>
            </header>

            <nav className="banner">
                <Link to="/menu" className="menu-link">User Menu</Link>
                <Link to="/order-history" className="menu-link">Order History</Link> 
                
                <div className="cart-icon-wrapper">
                    <img src={cartIcon} alt="Cart" className="cart-icon" />
                </div>
            </nav>

            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image"/>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <input 
                                type="number" 
                                className="product-price-input" 
                                value={product.price} 
                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                            />
                            <p className="product-description">{product.description}</p>
                            <button className="remove-product-button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
                
                <div className="product-item add-new-product">
                    <div className="add-product-icon" onClick={handleAddProduct}>+</div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={newProduct.name} 
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="new-product-input"
                    />
                    <input 
                        type="number" 
                        placeholder="Price" 
                        value={newProduct.price} 
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="new-product-input"
                    />
                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={newProduct.description} 
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="new-product-input"
                    />
                    <input 
                        type="text" 
                        placeholder="Image URL" 
                        value={newProduct.image} 
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="new-product-input"
                    />
                </div>
            </div>
            <footer className="footer">
                &copy; 2024 Our Cafe. All rights reserved.
            </footer>
        </div>
    );
};
export default AdminMenuPage;
