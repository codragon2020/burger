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

router.put("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.updateOne(
    {
        devoured: req.body.devoured
    },
    condition,
    function(result) {
        if (result.changedRows === 0) {

        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
        }
        res.status(200).end();
    }
  );
});

// ----------------------------------------------------


// Export routes
module.exports = router;