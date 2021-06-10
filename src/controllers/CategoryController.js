const Category = require("../model/Category");

class CategoryController {
  async store(req, res) {
    let {name} = req.body;
    name = name.trim();
    if(!name){
      return res.status(400).json({
        message: 'name is mandatory!'
      });  
    }
    try {
      const categoryExists = await Category.find({name});
      if(categoryExists && categoryExists.length){
        return res.status(409).json({
          message: `The Category ${name} already exists.`
        });
      }

      const data = await Category.create({name});
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  }

  async index(req, res) {
    try {
      const data = await Category.find();
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

module.exports = new CategoryController();