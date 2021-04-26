const router = require("express").Router();
const Category = require('../models/Category');
// const Product =

/* GET home page */
router.get('/', (req, res, next) => {
  // Product.find()
  // .then (products => {
  Category.find()
  .then(categories => {
    res.render('index', {categoryList: categories})
  })
  .catch(err => {
    next(err);
  })
});


router.post('/', (req, res, next) => {
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

module.exports = router;

