const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: String,
  description: String,
  condition: String,
  price: Number,
  deliveryOptions: String,
  category: [{type: Schema.Types.ObjectId, ref: 'Category'}]
})

const Product = model('Product', productSchema);

module.exports = Product;