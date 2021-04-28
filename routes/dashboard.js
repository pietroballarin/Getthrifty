const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');


router.get('/dashboard/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const categories = ['books', 'clothes', 'cars', 'collectibles & antiquities', 'electronics', 'furniture', 'sport', 'bicycles']
    res.render('products/new', { user: req.user, categories})
  
});

router.get('/dashboard/edit/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => {
    res.render('dashboard/edit', {productInfo: product})
  })
})

router.post('/dashboard', (req, res, next) => {
  const {title, description, condition, price} = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
    condition: condition,
    price: price
  })
  .then(product => {
    res.redirect('dashboard')
  })
  .catch(err => {
    next(err);
  })
});


router.post('/dashboard/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
  .then(product => {
    res.redirect('/dashboard')
  })
  .catch(err => {
    next(err);
  })
});




//router.get('/new', (req, res, next) => {
  //res.render('new')
//})

module.exports = router;

