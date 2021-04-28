// const express = require("express");
// const Category = require("../models/Category");
// const Item = require("../models/Item");
// const router = express.Router();

// router.post('/items', (req, res) => {
//     const { title, genre, plot } = req.body;
//     Item.create({
     
//     })
//       .then(addItem => {
//         console.log(`A item was added: ${addItem}`);
//         res.redirect(`/movies/${addedMovie._id}`)
//       })
//   })

//   router.get("/", (req, res, next) => {
//     Item.find()
//       .then(items => res.render("items/new", {items}))
//       .catch(error => next(error))
//     })
  


module.exports = router;