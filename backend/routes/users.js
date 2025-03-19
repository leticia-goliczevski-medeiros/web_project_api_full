const express = require('express');
const {
  getUsers, getUser, createUser, updateProfileInfo, updateProfileAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  })
}), createUser);

userRouter.patch('/me', updateProfileInfo);

userRouter.patch('/me/avatar', updateProfileAvatar);

module.exports = { userRouter };
