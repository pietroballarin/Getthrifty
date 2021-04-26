const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost/bookshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  {
  title: String,
  description: String,
  type: String,
  condition: String,
  price: Number,
  deliveryOptions: String,
  },
];

Product.insertMany(products)
  .then(products => {
    console.log(`Success! Added ${products.length} products to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })