const express = require("express")
const routes = express.Router()
const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

//PRODUCT
routes.post('/', productController.validation, productController.store)
routes.get('/list', productController.index)
routes.delete('/:id', productController.delete)

module.exports = routes;