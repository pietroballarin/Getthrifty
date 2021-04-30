const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User.model");
const ensureLogin = require('connect-ensure-login');


router.get('/', (req, res, next) => {
  const categories = ['Select a Category', 'Books', 'Clothes', 'Cars', 'Collectibles & Antiquities', 'Electronics', 'Furniture', 'Sport', 'Bicycles']
  Product.find()
    .then(products => {
      res.render('index', {
        categories,
        productInfo: products
      })
    })
    .catch(err => {
      next(err);
    })
});

router.get('/show/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      console.log(product, "AAAAA")
      res.render('show.hbs', {
        productInfo: product
      })
    })
})

router.get('/dashboard', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const creatorId = req.session.passport.user;
  Product.find({
      creator: creatorId
    })
    .then(products => {
      res.render('dashboard', {user: req.user,
        productInfo: products
      })
    })
    .catch(err => {
      next(err);
    })
})

router.get('/search', (req, res, next) => {
  Product.find()
    .then(products => {
      let searchedProd = products;
      
      if (req.query.q) {
          searchedProd = products.filter(product => {
           if (!product.title) return false;
          return product.title.toLowerCase().includes(req.query.q.toLowerCase());
        });
      }

      res.render('index', {
        productInfo: searchedProd
      })
    })
    .catch(err => {
      next(err);
  })
})

router.get('/category', (req, res, next) => {
  console.log(req.query, "QUERY")
  console.log(req.body)
  Product.find({
      categories: req.query.categories
    })
    .then(products => {
      res.render('category.hbs', {
        productInfo: products
      })
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
  res.render('products/new', {
    user: req.user,
    categories
  })
});

module.exports = router;