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

router.get('/adminPanel', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Product.find()
   .then(products => {
    res.render('admin-panel', {productInfo: products})
  })
  .catch(err => {
    next(err);
  })
});

router.get('/dashboard', (req, res, next) => {
  const creatorId = req.session.passport.user;
  Product.find({creator: creatorId})
  .then(products => {
    res.render('dashboard', {productInfo: products})
  })
  .catch(err => {
    next(err);
  })
})


// router.get('/:id', (req, res, next) => {
//   Product.findById(req.params.id)
//     .then(product => {
//       res.render('products/show.hbs', {productInfo: product})
//     })
//     .catch(err => {
//       next(err);
//     })
// });

// router.post('/', (req, res, next) => {
// })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/new', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('new')
})

module.exports = router;