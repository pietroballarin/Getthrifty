const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/signup', (req, res, next) => {
  res.render('signup')
});

router.post('/signup', (req, res, next) => {
  const {username, fullname, email, password} = req.body;
  if (password.length < 4) {
    res.render('signup', {message: 'Password too short'})
    return;
  }
  if (username.length < 3) {
    res.render('signup', {message: 'Username must be at least 3 characters long'})
    return;
  }
  if (fullname.length < 3) {
    res.render('signup', {message: 'Your name must be at least 3 characters long'})
    return;
  }
  if (!email.includes('@')) {
    res.render('signup', {message: 'Please provide a valid email address'})
    return;
  };
  User.findOne({username: username})
  .then(user => {
    if(user !== null) {
      res.render('signup', {message: 'Username already in use'})
      return;
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        username: username,
        fullname: fullname,
        email: email,
        password: hash
      })
        .then(newUser => {
          console.log(newUser)
        })
        res.redirect('/')
        .catch(err => {
            console.log(err)
        })
    }
  })   
})

module.exports = router;