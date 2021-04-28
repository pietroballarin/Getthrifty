const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');

router.post('/admin-panel', (req, res, next) => {
    const { name } = req.body;
    Category.create({
      name: name
    })
      .then(categories => {
        console.log(categories)
        res.redirect('/admin-panel')
      })
      .catch(err => {
        next(err);
      })
})

router.get('/adminPanel', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Product.find()
   .then(products => {
    res.render('admin-panel', {productInfo: products})
  })
  .catch(err => {
    next(err);
  })
});

module.exports = router;