const router = require("express").Router();
const User = require('../models/User.model');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');
const { uploader, cloudinary } = require("../config/cloudinary");


router.get('/dashboard/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
    res.render('dashboard/new', { user: req.user, categories})
});



router.get('/dashboard/edit/:id', (req, res, next) => {
  const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles'];
  Product.findById(req.params.id)
  .then(product => {
    res.render('dashboard/edit', {productInfo: product, categories})
  })
})

router.post('/dashboard/new', uploader.single('photo'), (req, res) => {
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
          res.redirect('/dashboard')
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
      address: address,
    })
      .then(productAdd => {
        console.log('pathNoImage', productAdd)
          res.redirect('/dashboard')
      })    
  }
});

module.exports = router;

router.post('/dashboard/edit/:id', uploader.single('photo'), (req, res, next) => {
  const {title, description, condition, price, address, userEmail} = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
    condition: condition,
    price: price,
    userEmail: userEmail, 
    address: address,
    imgPath: req.file.path,
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