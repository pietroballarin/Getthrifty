const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User.model");
const ensureLogin = require('connect-ensure-login');
const router = express.Router();

router.get('/dashboard/email-form/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Product.findById(req.params.id)
    .then(email => {
        console.log(email)
        res.render('dashboard/email-form', {emailInfo: email})
    })
})

module.exports = router;