import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [items, setItems] = useState([]); // State to store items
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items for order
  const [zoneId, setZoneId] = useState(new URLSearchParams(window.location.search).get('zoneId'));
  // Fetch items when the component mounts
  useEffect(() => {
    axios.get('/api/menu/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);
  // Handle placing the order
  const handleOrder = async () => {
    try {
      const response = await axios.post('/api/order/place', { items: selectedItems, zoneId });
      alert('Order placed successfully!');
    } catch (error) {
      alert('Error placing order');
    }
  };
  // Handle item selection
  const handleItemChange = (itemId, checked) => {
    setSelectedItems(prevItems => 
      checked ? [...prevItems, itemId] : prevItems.filter(id => id !== itemId)
    );
  };
  return (
    <div>
      <h2>Order Page</h2>
      <h3>Menu Items</h3>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <input 
                type="checkbox" 
                onChange={(e) => handleItemChange(item.id, e.target.checked)} 
              />
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading items...</p>
      )}
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};
export default OrderPage;
