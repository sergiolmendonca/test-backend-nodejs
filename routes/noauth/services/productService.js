const productModel = require("../../../models/product")

module.exports = productService = {
    findProduct: () => {
        return new Promise((resolve, reject) => {
            const products = productModel.find()
            products
                .then((product) =>{
                    resolve(product)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    storeProduct: (product) => {
        return new Promise((resolve, reject) => {
            const newProduct = new productModel({
                ...product
            }).save()
            newProduct
                .then((product) => {
                    resolve(product)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    updateProduct: (product, id) => {
        return new Promise((resolve, reject) => {
            const newProduct = productModel
                .findByIdAndUpdate(id, { 
                    ...product
                })
            newProduct
                .then((resProduct) => {
                    resolve(resProduct)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            const deletedProduct = productModel
                .findByIdAndDelete(id)
            deletedProduct
                .then((product) => {
                    resolve(product)
                })
                .catch((err) => {
                    console.log(2)
                    reject(err)
                })
        })
    }
}