const express = require('express');
const {
  getUserInfo, updateProfileInfo, updateProfileAvatar,
} = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');
const { validateURL } = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
}), updateProfileInfo);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL)
  })
}), updateProfileAvatar);

module.exports = { userRouter };
