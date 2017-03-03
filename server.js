// Require our packages
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //setting bluebird to be the promise library for mongoose (promise is not used alone)
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { port, env, dbURI, sessionSecret } = require('./config/environment');

const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');


// Create an Express App
const app = express();

// Set up our template engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// Set up our Static File folder
app.use(express.static(`${__dirname}/public`));

// Connect to our database
mongoose.connect(dbURI);

// Set up our Middleware
if(env !== 'test')app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;

    return method;
  }
}));

// Set up our sessions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// Set up flash messages AFTER sessions
app.use(flash());

// Set up our Custom Middleware.
app.use(customResponses);
app.use(authentication);

// Set up our routes - just before our error handler
app.use(routes);

// Set up our error handler - always our LAST piece of middleware
app.use(errorHandler);


app.listen(port, () => console.log(`Express is listening to port ${port}`));
