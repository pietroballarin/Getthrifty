const router = require("express").Router();
const User = require('../models/User.model');
const ensureLogin = require('connect-ensure-login');

router.get('/create-ad', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render('create-ad', { user: req.user })
});

module.exports = router;