const router = require("express").Router();
const User = require('../models/User.model');
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

router.get('/private', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('private', { user: req.user });
    console.log(req.user)
});

router.get('/private/admin-panel', checkAdmin('admin'), (req, res) => {
    res.render('admin-panel', { user: req.user });
    console.log(req.user)
  })

module.exports = router;