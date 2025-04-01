const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../errors/serverError');

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      next(error);
    });
}

function createUser(req, res, next) {
  const {
    email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new ServerError(`Não foi possível criar o usuário.`);
      }

      res.status(201).send({ email: user.email, _id: user._id });
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = { login, createUser };
