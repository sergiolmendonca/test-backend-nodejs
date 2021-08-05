const categoryModel = require("../../../models/category")

module.exports = categoryService = {
    findCategory: (name) => {
        return new Promise((resolve, reject) => {
            const newCategoryModel = categoryModel
                .find({
                    name: name
                })
            newCategoryModel.then((category) => {
                resolve(category)
            })
            .catch((err) => {
                reject(err)
            })
        })
        
    },
    storeCategory: (name) => {
        return new Promise((resolve, reject) => {
            const newCategoryModel = new categoryModel({
                name
            }).save()
            newCategoryModel
                .then((category) => {
                    resolve(category)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    listCategories: () => {
        return new Promise((resolve, reject) => {
            const categories = categoryModel
                .find()
            categories
                .then((categoryList) => {
                    resolve(categoryList)
                }) 
                .catch((err) => {
                    reject(err)
                })
        })
    }
}