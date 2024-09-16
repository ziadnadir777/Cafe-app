const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.findAll();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItem = await Menu.findById(menuItemId);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const menuData = req.body;
    const newMenuItemId = await Menu.create(menuData);
    res.status(201).json({ id: newMenuItemId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedData = req.body;
    await Menu.update(menuItemId, updatedData);
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    await Menu.delete(menuItemId);
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
