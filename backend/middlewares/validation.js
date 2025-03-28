const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
}

function validateEmail(value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }

  return helpers.error('string.email');
}

module.exports = { validateURL, validateEmail };
