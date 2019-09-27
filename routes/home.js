const express = require('express');
const router = express.Router();


// (path/url, callback(req, res))
router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Express App',
    message: 'Helloooo'
  }); // render method to send HTML markUp
});

module.exports = router;