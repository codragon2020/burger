// Node Dependencies
const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');


// Create routes
// ----------------------------------------------------
// Index Redirect
router.get('/', (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log('hbsObject', hbsObject);
    res.render('index', hbsObject)
  });
});


// ----------------------------------------------------


// Export routes
module.exports = router;