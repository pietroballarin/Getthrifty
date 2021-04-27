const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: String,
  description: String,
  condition: String,
  price: Number,
  deliveryOptions: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
  creator: [{type: Schema.Types.ObjectId, ref: 'user'}],
  imgName: String,
  imgPath: String,
  publicId: String
})

const Product = model('Product', productSchema);

module.exports = Product;