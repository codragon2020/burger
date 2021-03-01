// Import Node Dependencies
const connection = require('./connection.js');

// Connect to MySQL database
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
  console.log('connected as id ' + connection.threadId);
});

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";const printQuestionMarks = (num) => {
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = (ob) => {
  const arr = [];

  // Loop through the keys and push the key/value as a string int arr
  for (const key in ob) {
    let value = ob[key];
    
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {

      // if string with spaces, add quotations (Cheese burger => 'Cheese burger')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      
      // e.g. {name: 'Cheese burger'} => ["name='Cheese burger'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(`${key}=${value}`);
    }
  }

  // Translate array of strings to a single comma-separated string
  return arr.toString();
};

// Methods for MySQL commands
const orm = {

  all: function(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    // Run MySQL Query
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  create: function(tableInput, cols, vals, cb) {
    var queryString = "INSERT INTO " + tableInput;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};


// Export the ORM object in module.exports.
module.exports = orm;