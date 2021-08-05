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
    try {
      // const categoryExists = categoryServices.find({name});
      // if(categoryExists && categoryExists.length){
      //   return res.status(409).json({
      //     message: `The Category ${name} already exists.`
      //   });
      // }

      // const data = Category.create({name});
      // return res.status(201).json(data);

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
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  },

  index(req, res) {
    try {
      const data = Category.find();
      return res.status(200).json({
        categories: data, 
        total: data.length
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  }
}