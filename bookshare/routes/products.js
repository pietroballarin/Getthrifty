const express = require("express");
const Product = require("../models/Product");
const Category = require('../models/Category');
const User = require("../models/User.model");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get('/products/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Category.find({})
    .then(categories => {
      res.render('products/new', { user: req.user, categoryList: categories})
    })
  });

router.post('/', (req, res, next) => {
  Category.find()
  .populate('categories')
  const { title, description, condition, price, categories, creator} = req.body;
  Product.create({
    title: title,
    description: description,
    condition: condition,
    price: price,
    categories: categories,
    creator: req.session.passport.user
  })
  
    .then(productAdd => {

        res.redirect('/')
    })    
});


module.exports = router;