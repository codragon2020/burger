// Node dependency
const orm = require("../config/orm.js");

// Call the ORM functions using burger specific input for the ORM
const burger = {
    selectAll: function(cb) {
        orm.all("burgers", function(res) {
          cb(res);
        });
    },
    
    updateOne: function(objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },
};

// Export at the end of the burger.js file.
module.exports = burger;
