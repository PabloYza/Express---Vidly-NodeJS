const express = require('express');
const router = express.Router();

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



router.get('/', (req, res) => {
  res.send(courses);
});
router.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  res.send(course);
});

// (path/url, routeHandler(res, req))
router.post('/', (req, res) => {
  // Look up the course - if not existing, return 400
  const {
    error
  } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


router.put('/:id', (req, res) => {
  // Look up the course - if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Validate - If invalid, return 400 bad request
  const {
    error
  } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  //update course - return updated course
  course.name = req.body.name;
  res.send(course);
});


router.delete('/:id', (req, res) => {
  // Look up the course - if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); // we go to said index, and remove 1 OBJECT

  // Return the same course
  res.send(course);
});

module.exports = router;