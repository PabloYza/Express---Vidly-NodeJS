const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug'); // Express will automatically load this module
app.set('views', './views');// optional setting to set the path to the template

// MIDDLEWARE
app.use(express.json()); // parses body of REQ if there is a JSON object it populates -> req.body
app.use(express.urlencoded({ extended: true })); // parses inc requests with URL encoded payloads // req.body -> key=value&key=value
app.use(express.static('public')); // Used to serve static content
app.use(helmet())
app.use(morgan('tiny')); //logs the REQ in console and gives additional info

app.use('/api/courses', courses); // (PATH, routerObject imported) -> For any routes that start with /api/courses use COURSES router
app.use('/', home);

// Configuration
/* console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`); */


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');

}

app.use(logger);

// PORT
const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Listening on port ${port}...`)
});