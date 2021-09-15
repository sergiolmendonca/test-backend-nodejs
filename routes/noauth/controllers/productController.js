const productServices = require("../services/productService");
const categoryServices = require("../services/categoryService");

function saveProduct(product, res){
  productServices
  .storeProduct(product)
  .then((product) => {
    res.json({
      success: true,
      info: product
    })
  })
  .catch((err) => {
    res.json({
      success: false,
      message: err
    })
  })
}

module.exports =  productController =  {

  store: (req, res, next) => {
      const {title, description, price, category} = req.body;
      categoryServices
        .findCategory(category)
        .then((objCategory) => {
          var product = {
            title: title, 
            description: description, 
            price: price
          }
          if(!(objCategory && objCategory.length)){
              categoryServices
                .storeCategory(category)
                .then((newCategory) => {
                  product.category = newCategory._id
                  saveProduct(product, res)
                })
                .catch((err) => {
                  res.json({
                    success: false,
                    message: err
                  })
                })
            }
          else{
            product.category = objCategory[0]._id
            saveProduct(product, res)
          }
        })
  },
  index: (req, res) => {
    productServices
      .findProduct()
      .then((products) => {
        res.json({
          success: true,
          info: products
        })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        })
      })
  },

  update: (req, res) => {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    categoryServices
      .findCategory(category)
      .then((categoryId) => {
        var product = {
          title: title,
          description: description,
          price: price,
          category: categoryId[0]._id
        }

        productServices
          .updateProduct(product, id)
          .then((productRes) => {
            res.json({
              success: true,
              info: productRes
            })
          })
          .catch((err) => {
            res.json({
              success: false,
              message: err
            })
          })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        })
      })


    // const product = Product.findById(id);
    // if(!product) {
    //   return res.status(404).json({message: 'Product not found.'});
    // }
    // try {
    //   if(category) {
    //     const result = Category.findOne({ name: category.trim() });
    //     if(result) {
    //       Product.findByIdAndUpdate(id, { 
    //         title: title.trim() || product.title, 
    //         description: description.trim() || product.description, 
    //         price: price || product.price, 
    //         category: result._id 
    //       });
    //       return res.json({message: 'Product up to date.'})
    //     }
    //     return res.status(404).json({message: `Category ${category} not found.`});
    //   }
    //   Product.findByIdAndUpdate(id, { 
    //     title: title.trim() || product.title, 
    //     description: description.trim() || product.description, 
    //     price: price || product.price,
    //   });
    //   return res.json({message: 'Product up to date.'})
    // } catch (error) {
    //   return res.status(error.status || 500).json({
    //     message: error.message || 'Internal error.'
    //   });
    // }
  },

  delete: (req, res) => {
    const { id } = req.params;
    productServices
      .deleteProduct(id)
      .then((product) => {
        res.json({
          success: true,
          info: product
        })
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        })
      })

  },

  filterProducts: (req, res) => {
    const {category, name} = req.query;
    try {
      if(category){
        const result = Category.findOne({ name: category });
        if(result && result._id) {
          const products = Product.find({ category: result._id }).populate('category');
          return res.json(products);
        }
        return res.status(404).json({message: 'Category not found.'});
      }else{
        const data = Product.find({
          'title' : name
        }, {
          __v: 0
        }).populate('category');
        return res.status(200).json(data);
      }
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  },

  validation: (req, res, next) => {
    next()
  },

}
