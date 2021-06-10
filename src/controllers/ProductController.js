const Product = require("../model/Product");
const Category = require("../model/Category");

class ProductController {
  async store(req, res) {
    try {
      const {title, description, price, category} = req.body;
      const categoryResult = await Category.find({name: category});
      const data = await Product.create({
        title: title, 
        description: description, 
        price, 
        category: categoryResult[0]._id
      });
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({message: 'Internal error.'});
    }
  }

  async index(req, res) {
    try {
      const data = await Product.find().populate('category');
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error.'});
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    const product = await Product.findById(id);
    try {
      await Product.findByIdAndUpdate(id, { 
        title: title || product.title, 
        description: description || product.description, 
        price: price || product.price,
      });
      return res.json({message: 'Product up to date.'})
    } catch (error) {
      return res.status(error.status || 500).json({message: 'Internal error.'});
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      return res.json({message: 'Product deleted.'})
    } catch (error) {
      return res.status(500).json({message: 'Internal error.'});
    }
  }

  async filterProducts(req, res) {
    const {category, name} = req.query;
    try {
      if(category){
        const result = await Category.findOne({ name: category });
        if(result && result._id) {
          const products = await Product.find({ category: result._id }).populate('category');
          return res.json(products);
        }
        return res.status(404).json({message: 'Category not found.'});
      }
      const data = await Product.find({
        'title' : name
      }).populate('category');
      return res.json(data);
    
    } catch (error) {
      return res.status(500).json({message: 'Internal error.'});
    }
  }
}

module.exports = new ProductController();