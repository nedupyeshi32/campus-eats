// models/MenuItem.js
const db = require('../config/db');

// Fetch all menu items for a specific restaurant ID
exports.getMenuByRestaurant = (restaurantId) => {
  return db.any('SELECT * FROM menu_items WHERE restaurant_id = $1 ORDER BY id', [restaurantId]);
};

// Fetch a single menu item by its ID
exports.getMenuItemById = (id) => {
  return db.oneOrNone('SELECT * FROM menu_items WHERE id = $1', [id]);
};