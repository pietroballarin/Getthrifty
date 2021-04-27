const router = require("express").Router();
const Category = require('../models/Category');
const Product = require("../models/Product");


/* GET home page */
router.get('/', (req, res, next) => {
  Product.find()
   .then(products => {
    console.log(products)
  
  Category.find()
  .then(categories => {
    res.render('index', {categoryList: categories, productInfo: products})
  })
})
  .catch(err => {
    next(err);
  })
});

router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.render('products/show', {productInfo: product})
    })
    .catch(err => {
      next(err);
    })
});

// router.post('/', (req, res, next) => {
// })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

