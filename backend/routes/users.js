const express = require('express');
const {
  getUsers, getUser, createUser, updateProfileInfo, updateProfileAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.patch('/me', updateProfileInfo);

userRouter.patch('/me/avatar', updateProfileAvatar);

module.exports = { userRouter };
