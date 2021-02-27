// Node Dependencies
const express = require('express');
// const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
// var router = require('./controllers/burgers_controllers.js');
// app.use('/', router);


// Open Server
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);