const express = require("express");
//const Category = require("../models/Category");
const Product = require("../models/Product");
const router = express.Router();

router.get("/show", (req, res, next) => {

  Product.find()
  .then(productData => {
    res.render("p",{productData});
  })
  .catch(error => {
    console.log(error);
    next(error);
  })
});


router.post('/product', (req, res) => {
  const { title, description, condition,price } = req.body;
  console.log(title)
  Product.create({
    title: title,
    description: description,
    condition: condition,
    price: price
  })
    .then(productAdd => {
      console.log(productAdd)
      res.render('index')
    })
});

router.get('/add', (req, res) => {
  res.render('products/new.hbs')
})










module.exports = router;