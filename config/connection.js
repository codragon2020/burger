// Node Dependency
var mysql = require('mysql');
const dotenv = require('dotenv');
var connection;

// Call dotenv configuration
dotenv.config();

// For Heroku Deployment vs. Local MySQL Database
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password: process.env.password,
    database : 'burgers_db' // Add your database
  });
}


// Export the Connection
module.exports = connection;