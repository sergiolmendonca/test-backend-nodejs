const express = require("express");
const routes = express.Router()

const categoryController = require("../controllers/categoryController")

routes.get('/', categoryController.index)
routes.post('/', categoryController.store)

module.exports = routes