const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);

module.exports = router;
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
const menuController = require('../controllers/menuController');

router.get('/menu', menuController.getMenu);
