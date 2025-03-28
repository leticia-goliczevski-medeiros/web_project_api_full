const express = require('express');
const { Joi, celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/auth');
const { validateURL, validateEmail } = require('../middlewares/validation');

const authRouter = express.Router();

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail).required(),
    password: Joi.string().required(),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().custom(validateEmail).required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = { authRouter };
