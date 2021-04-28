const router = require("express").Router();
const Category = require('../models/Category');
const Product = require("../models/Product");
const User = require("../models/User.model");
const ensureLogin = require('connect-ensure-login');

/* GET home page */
router.get('/', (req, res, next) => {
  Product.find()
   .then(products => {
  Category.find()
  .then(categories => {
    res.render('index', {categoryList: categories, productInfo: products})
  })
})
  .catch(err => {
    next(err);
  })
});

router.get('/dashboard', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const creatorId = req.session.passport.user;
  Product.find({creator: creatorId})
  .then(products => {
    res.render('dashboard', {productInfo: products})
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;

// router.get('/products/search', (req, res, next) => {
//   const { title } = req.query;
//   console.log(req.query)
//   Product.find({$text: {$search: title}})
//   .then(products => { 
    
//   res.render('products', { productInfo: products })
//   })
//   .catch(err => {
//     next(err);
//   })
//  })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/new', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('new')
})

module.exports = router;