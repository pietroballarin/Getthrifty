const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');


router.get('/dashboard/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
    res.render('products/new', { user: req.user, categories})
});



router.get('/dashboard/edit/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => {
    res.render('dashboard/edit', {productInfo: product})
  })
})

router.post('/dashboard/:id', (req, res, next) => {
  const {title, description, condition, price, address, userEmail} = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
    condition: condition,
    price: price,
    userEmail: userEmail, 
    address: address,
  })
  .then(product => {
    res.redirect('/dashboard')
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

module.exports = router;
