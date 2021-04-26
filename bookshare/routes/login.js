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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    passReqToCallback: true,
}))

router.get('/dashboard', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('dashboard', { user: req.user });
    console.log(req.user)
})

router.get('/private/admin-panel', checkAdmin('admin'), (req, res) => {
    res.render('admin-panel', { user: req.user });
    console.log(req.user)
})

module.exports = router;