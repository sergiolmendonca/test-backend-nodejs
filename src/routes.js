
const express = require("express");
const routes = express.Router();
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');

//CATEGORY
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);

//PRODUCT
routes.get('/products', ProductController.index);
routes.get('/product', ProductController.filterProducts);
routes.post('/product', ProductController.store);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;