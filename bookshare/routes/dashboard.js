const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");
const ensureLogin = require('connect-ensure-login');



router.get('/dashboard/new', ensureLogin.ensureLoggedIn(), (req, res, next) => {
Category.find()
  .then(categories => {
    res.render('products/new', { user: req.user, categoryList: categories})
  })
});


module.exports = router;