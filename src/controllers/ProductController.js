const Product = require("../model/Product");
const Category = require("../model/Category");
function productValidation(data){
  let errors = [];
  if(!data || !data.title){
    errors.push('Title is mandatory!');
  }
  if(!data || !data.description){
    errors.push('Description is mandatory!');
  }
  if(!data || !data.price){
    errors.push('Price is mandatory!');
  }
  if(!data || !data.category){
    errors.push('Category is mandatory!');
  }
  return errors;
}

class ProductController {
  

  async store(req, res) {
    try {
      const {title, description, price, category} = req.body;
      const errors = productValidation(req.body);
      if(errors.length){
        
        return res.status(400).json({
          message: errors.join(' ')
        })
      }
      const categoryExists = await Category.find({name: category.trim()});
      if(!(categoryExists && categoryExists.length)){
        return res.status(404).json({
          message: `Category ${category} not found.`
        })
      }
      const productExists = await Product.find({
        title: title.trim(),
        description: description.trim(),
        price: price
      });
      if(productExists && productExists.length){
        return res.status(409).json({
          message: `Product ${title} already exists.`
        });
      }
      const data = await Product.create({
        title: title.trim(), 
        description: description.trim(), 
        price, 
        category: categoryExists[0]._id
      });
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  }

  async index(req, res) {
    try {
      const data = await Product.find().populate('category');
      return res.status(200).json({
        products: data, 
        total: data.length
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }

  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({message: 'Product not found.'});
    }
    try {
      if(category) {
        const result = await Category.findOne({ name: category.trim() });
        if(result) {
          await Product.findByIdAndUpdate(id, { 
            title: title.trim() || product.title, 
            description: description.trim() || product.description, 
            price: price || product.price, 
            category: result._id 
          });
          return res.json({message: 'Product up to date.'})
        }
        return res.status(404).json({message: `Category ${category} not found.`});
      }
      await Product.findByIdAndUpdate(id, { 
        title: title.trim() || product.title, 
        description: description.trim() || product.description, 
        price: price || product.price,
      });
      return res.json({message: 'Product up to date.'})
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);
    if(!product) {
      return res.status(404).json({message: `Product not found.`});
    }
    try {
      await Product.findByIdAndDelete(id);
      return res.json({message: 'Product deleted.'})
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal error.'
      });
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
      }else{
        const data = await Product.find({
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
  }
}

module.exports = new ProductController();