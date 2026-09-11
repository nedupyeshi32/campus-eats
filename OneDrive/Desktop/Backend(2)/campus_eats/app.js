const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import Models
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

// View Engine & Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Part J: Homepage Route
app.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    res.render('index', { title: 'Campus Eats', restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Database query failed.');
  }
});

// Part K: Dynamic Menu Route
app.get('/restaurants/:id/menu', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).send('Restaurant not found.');
    }

    const menuItems = await MenuItem.getMenuByRestaurant(restaurantId);
    res.render('menu', { title: `Menu - ${restaurant.name}`, restaurant, menuItems });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).send('Database query failed.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
