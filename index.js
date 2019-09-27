const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


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

// (path/url, callback(req, res))
app.get('/', (req, res) => {
  res.send('Helloooo')
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course was not found');
  res.send(course);
});

// (path/url, routeHandler(res, req))
app.post('/api/courses', (req, res) => {

  const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  console.log(course)
  courses.push(course);
  res.send(course);

});




// PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening on port ${port}...`)
});