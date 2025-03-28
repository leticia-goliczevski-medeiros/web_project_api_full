const express = require('express');
const { Joi, celebrate } = require('celebrate');
const {
  getUser, updateProfileInfo, updateProfilePicture,
} = require('../controllers/users');
const { validateURL } = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.get('/users/me', getUser);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileInfo);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL),
  }),
}), updateProfilePicture);

module.exports = { userRouter };
