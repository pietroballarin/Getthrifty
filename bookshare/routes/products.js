const express = require("express");
const Product = require("../models/Product");
const Category = require('../models/Category');
const User = require("../models/User.model");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
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
      creator: req.session.passport.user,
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
      creator: req.session.passport.user
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

router.get('/products/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Category.find({})
    .then(categories => {
      res.render('products/new', { user: req.user, categoryList: categories})
    })
  });


module.exports = router;