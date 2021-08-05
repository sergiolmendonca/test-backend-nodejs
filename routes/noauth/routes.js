const express = require("express");
var router = express.Router()

const product = require("./routes/products")
router.use("/product", product)

const category = require("./routes/category")
router.use("/category", category)

module.exports = router
