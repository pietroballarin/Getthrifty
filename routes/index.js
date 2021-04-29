const router = require("express").Router();
const Category = require('../models/Category');
const Product = require("../models/Product");
const User = require("../models/User.model");
const ensureLogin = require('connect-ensure-login');

/* GET home page */
router.get('/', (req, res, next) => {
  const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
  Product.find()
   .then(products=> {
    res.render('index', {categories, productInfo: products}) 
})
  .catch(err => {
    next(err);
  })
});

router.get('/show/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => {
      console.log(product, "AAAAA")
      res.render('show.hbs', {productInfo: product})
      
  })
})

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

router.get('/products/search', (req, res, next) => {
  const { title } = req.query;
  console.log(req.query)
  Product.find()
  .then(products => { 
    // console.log(products, "PRODUCTS")
    const searchedProd = products.filter(product => {
      return product.title.includes(req.query.q)
    })
    console.log(searchedProd)
  res.render('index', { productInfo: searchedProd })
  })
  .catch(err => {
    next(err);
  })
 })

 router.get('/category', (req, res, next) => {
  const { categories } = req.query.categories;
  Product.find()
  .then(products => { 
    const searchedProd = products.filter(product => {
      return product.categories.includes(req.query.categories)
      
    })
    console.log(searchedProd, "Searched PRODUCTS")
  res.render('category.hbs', { productInfo: searchedProd })
  })
  .catch(err => {
    next(err);
  })
 })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
  res.render('products/new', { user: req.user, categories})
});

module.exports = router;

