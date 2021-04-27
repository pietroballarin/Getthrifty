const express = require("express");
const Product = require("../models/Product");
const Category = require('../models/Category');
const User = require("../models/User.model");
const router = express.Router();
const { uploader, cloudinary } = require("../config/cloudinary");


router.post('/', uploader.single('photo'), (req, res) => {
  const { title, description, condition, price, categories, creator } = req.body;
  // const imgPath = req.file.path;
  console.log(req.file)
  if (req.file.path) {
    console.log('image');
    Product.create({
      title: title,
      description: description,
      condition: condition,
      price: price,
      categories: categories,
      creator: creator,
      imgPath: req.file.path
    })
      .then(productAdd => {
        console.log(productAdd)
        //   Category.find()
        //   .then(categories => {
          res.redirect('/')
      // })
      })   
  } else {
    Product.create({
      title: title,
      description: description,
      condition: condition,
      price: price,
      categories: categories,
      creator: creator 
    })
      .then(productAdd => {
        console.log('pathNoImage', productAdd)
        //   Category.find()
        //   .then(categories => {
          res.redirect('/')
      // })
      })    
  }
 
});

// router.get('/product/delete/:id', (req, res, next) =>{
//   Product.findByIdAndDelete(req.params.id)
// })


// router.get('/add', (req, res) => {
//   res.render('products/new.hbs')
// })

module.exports = router;