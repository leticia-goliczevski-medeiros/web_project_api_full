const express = require('express');
const {
  getUsers, getUser, getUserInfo, updateProfileInfo, updateProfileAvatar,
} = require('../controllers/users');
const { authorize } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.get('/me', authorize, getUserInfo);

userRouter.patch('/me', updateProfileInfo);

userRouter.patch('/me/avatar', updateProfileAvatar);

module.exports = { userRouter };
