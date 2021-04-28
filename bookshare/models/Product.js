const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: String,
  description: String,
  condition: String,
  price: Number,
  deliveryOptions: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
  imgName: String,
  imgPath: String,
  publicId: String
  creator: {type: Schema.Types.ObjectId, ref: 'user'}
})

const Product = model('Products', productSchema);

module.exports = Product;