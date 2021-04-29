const router = require("express").Router();
const User = require('../models/User.model');
const Product = require("../models/Product");
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

const checkAdmin = role => (req, res, next) => {
    if (req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    passReqToCallback: true,
}))

router.get('/admin-panel', checkAdmin('admin'), (req, res) => {
  Product.find()
   .then(products => {
    res.render('admin-panel', { user: req.user, productInfo: products });
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;