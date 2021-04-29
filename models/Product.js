const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: String,
  description: String,
  condition: String,
  userEmail: String,
  address: String,
  price: Number,
  deliveryOptions: String,
  categories: {
    type: String,
    enum: ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
  },
  imgName: String,
  imgPath: String,
  publicId: String,
  creator: {type: Schema.Types.ObjectId, ref: 'user'}
})

const Product = model('Products', productSchema);

module.exports = Product;