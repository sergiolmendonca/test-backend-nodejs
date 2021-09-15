const categoryServices = require("../services/categoryService");

module.exports =  categoryController =  {
  store(req, res) {
    let {name} = req.body;
    name = name.trim();
    if(!name){
      return res.status(400).json({
        message: 'name is mandatory!'
      });  
    }
      categoryServices
        .storeCategory(name)
        .then((category) => {
          res.json({
            success: true,
            info: category,
            message: 'OK'
          })
        })
        .catch((err) => {
          res.json({
            success: false,
            message: err
          })
        })
  },

  index(req, res) {
    categoryServices
      .listCategories()
      .then((categories) => {
        res.json({
          success: true,
          info: categories
        })
        .catch((err) => {
          res.json({
            success: false,
            message: err
          })
        })
      })
  },
  delete: (req, res) => {

  }
}