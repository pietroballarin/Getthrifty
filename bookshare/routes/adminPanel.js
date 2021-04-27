const router = require("express").Router();
const User = require('../models/User.model');
const Category = require('../models/Category');
const Product = require("../models/Product");

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



module.exports = router;