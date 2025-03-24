const express = require('express');
const {
  getUserInfo, updateProfileInfo, updateProfileAvatar,
} = require('../controllers/users');
const { authorize } = require('../middlewares/auth');

const userRouter = express.Router();

// userRouter.get('/', getUsers);

// userRouter.get('/:id', getUser);

userRouter.get('/me', authorize, getUserInfo);

userRouter.patch('/me', authorize, updateProfileInfo);

userRouter.patch('/me/avatar', authorize, updateProfileAvatar);

module.exports = { userRouter };
