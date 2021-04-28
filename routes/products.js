const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User.model");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const { uploader, cloudinary } = require("../config/cloudinary");



router.post('/', uploader.single('photo'), (req, res) => {
  const { title, description, condition, price, categories, creator, userEmail, address} = req.body;
  if (req.file.path) {
    Product.create({
      title: title,
      description: description,
      condition: condition,
      price: price,
      categories: categories,
      creator: req.session.passport.user,
      imgPath: req.file.path,
      userEmail: userEmail,
      address: address
    })
      .then(productAdd => {
        console.log(productAdd)
          res.redirect('/')
      })   
  } else {
    Product.create({
      title: title,
      description: description,
      condition: condition,
      price: price,
      categories: categories,
      creator: req.session.passport.user,
      userEmail: userEmail,
      address: address
    })
      .then(productAdd => {
        console.log('pathNoImage', productAdd)
          res.redirect('/')
      })    
  }
 
});

module.exports = router;