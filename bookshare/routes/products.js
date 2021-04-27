const express = require("express");
const Product = require("../models/Product");
const Category = require('../models/Category');
const User = require("../models/User.model");
const router = express.Router();

// router.get("/show", (req, res, next) => {
//   Product.find()
//   .then(productData => {
//     res.render("p",{productData});
//   })
//   .catch(error => {
//     console.log(error);
//     next(error);
//   })
// });

router.post('/', (req, res) => {
  const { title, description, condition, price, categories, creator } = req.body;
  console.log(title)
  Product.create({
    title: title,
    description: description,
    condition: condition,
    price: price,
    categories: categories,
    creator: creator
  })
    .then(productAdd => {
      console.log(productAdd)
      //   Category.find()
      //   .then(categories => {
        res.redirect('/')
    // })
    })    
});

// router.get('/add', (req, res) => {
//   res.render('products/new.hbs')
// })

module.exports = router;