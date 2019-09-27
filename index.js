const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json()); // parses body of REQ if there is a JSON object it populates -> req.body
app.use(express.urlencoded({ extended: true })); // parses inc requests with URL encoded payloads // req.body -> key=value&key=value
app.use(express.static('public')); // Used to serve static content
app.use(helmet())
app.use(morgan('tiny')); //logs the REQ in console and gives additional info

app.use(logger);



const courses = [{
    id: 1,
    name: 'Course 1'
  },
  {
    id: 2,
    name: 'Course 2'
  },
  {
    id: 3,
    name: 'Course 3'
  },
];

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}


// (path/url, callback(req, res))
app.get('/', (req, res) => {
  res.send('Helloooo')
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  res.send(course);
});

// (path/url, routeHandler(res, req))
app.post('/api/courses', (req, res) => {
  // Look up the course - if not existing, return 400
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
  // Look up the course - if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Validate - If invalid, return 400 bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  //update course - return updated course
  course.name = req.body.name;
  res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  // Look up the course - if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); // we go to said index, and remove 1 OBJECT

  // Return the same course
  res.send(course);
});



// PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening on port ${port}...`)
});