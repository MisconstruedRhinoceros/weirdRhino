var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  scrape_date: {
    type: Date,
    required: true
  },
  product_technologies: {
    type: Array,
    required: false
  },
  product_url: {
    type: String,
    required: true
  }
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
