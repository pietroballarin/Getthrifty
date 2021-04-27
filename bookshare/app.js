require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const bcrypt = require('bcrypt')
const app = express();
const User = require('./models/User.model');

require("./config")(app);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('./db/index');
const passport = require('passport')
const DB_URL = 'mongodb://localhost/bookshare';


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000*60*60
    },
    store: MongoStore.create({
      mongoUrl: DB_URL
    })
  })
)

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch(err => 
    done(err)
)
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password' 
    },
    (username, password, done) => {
      User.findOne({username})
        .then(user => {
          if(!user) {
            return done(null, false, {message: 'Incorrect username or password'})
          }
          else if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Incorrect username or password'})
          }
          else {
            done(null, user)
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  )
)

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
const projectName = "bookshare";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);


const signup = require("./routes/signup");
app.use("/", signup);

const login = require("./routes/login");
app.use("/", login);

const dashboard = require("./routes/dashboard");
app.use("/", dashboard);

const admin = require("./routes/adminPanel");
app.use("/", admin);

const products = require("./routes/products");
app.use("/", products);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;