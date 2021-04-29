const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');

router.post('/admin-panel/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
  .then(product => {
    res.redirect('/admin-panel')
  })
  .catch(err => {
    next(err);
  })
});

module.exports = router;