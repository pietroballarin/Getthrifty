const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');

router.get('/dashboard/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
Category.find({})
  .then(categories => {
    res.render('products/new', { user: req.user, categoryList: categories})
  })
  .catch(err => {
    next(err);
  })
});

router.post('/dashboard', (req, res, next) => {
  const {title, description, price, category} = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
    price: price,
    category: category
  })
  .then(product => {
    res.redirect('dashboard')
  })
  .catch(err => {
    next(err);
  })
});

router.get('/dashboard/edit', (req, res, next) => {
  res.render('dashboard/edit')
})

router.post('/dashboard', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id)
  .then(product => {
    res.redirect('dashboard')
  })
  .catch(err => {
    next(err);
  })
});



router.get('/new', (req, res, next) => {
  res.render('new')
})

module.exports = router;