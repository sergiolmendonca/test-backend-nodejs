
const express = require("express");
const routes = express.Router();
const CategoryController = require('./controllers/CategoryController');

//CATEGORY
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);

module.exports = routes;