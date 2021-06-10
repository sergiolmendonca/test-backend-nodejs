const Category = require("../model/Category");

class CategoryController {
  async store(req, res) {
    let {name} = req.body;
    try {
      const data = await Category.create({name});
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({message: 'Internal error.'});
    }
  }

  async index(req, res) {
    try {
      const data = await Category.find();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({message: 'Internal error.'});
    }
  }
}

module.exports = new CategoryController();