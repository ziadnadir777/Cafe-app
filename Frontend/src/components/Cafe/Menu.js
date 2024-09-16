import React, { useState, useEffect } from 'react';
import { fetchMenu } from '../../services/api';

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      const data = await fetchMenu();
      setMenu(data);
    };
    getMenu();
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            {/* Add to cart button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
