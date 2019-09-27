function log(req, res, next) {
  console.log('Logging...');
  next(); // To pass control to the next middleware FUNC
};

module.exports = log;