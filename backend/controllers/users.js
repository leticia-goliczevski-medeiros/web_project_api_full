const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ServerError = require('../errors/serverError');
const InvalidDataError = require('../errors/invalidDataError');

function getUserInfo(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
  .orFail(()=> {
      throw new NotFoundError(`Não foi possível encontrar o usuário com o id ${id}`);
    }
  )
  .then((user)=> res.send(user))
  .catch((error)=> {
    next(error);
  })
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then((hash)=> User.create({ name, about, avatar, email, password: hash}))
  .then((user) => {
    if(!user) {
      throw new ServerError(`Não foi possível criar o usuário ${name}`)
    }

    res.status(201).send({ email: user.email, _id: user._id})
  })
  .catch((error) => {
    next(error);
  })
}

function updateProfileInfo(req, res, next) {
  const userId = req.user._id;
  const { name, about } = req.body;

  if (!name || !about) {
    throw new InvalidDataError('Não foi possível atualizar os dados do usuário. Dados incompletos.')
  }

  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
  .orFail(()=> {
    throw new ServerError(`Não foi possível atualizar o usuário ${name}`);
  })
  .then((user) => res.send(user))
  .catch((error) => {
    next(error);
  });
}

function updateProfileAvatar(req, res, next) {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (!avatar) {
    throw new InvalidDataError('Não foi possível atualizar a foto do usuário. Dados incompletos.');
  }

  const isAvatarValid = validator.isURL(avatar);

  if (!isAvatarValid) {
    throw new InvalidDataError('Não foi possível atualizar a foto de usuário. Link do avatar inválido.');
  }

  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(()=> {
      throw new ServerError(`Não foi possível atualizar a foto de usuário.`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
  .then((user)=> {
    const token = jwt.sign({ _id: user._id }, 'chave', { expiresIn: '7d' });

    res.send({token});
  })
  .catch((error)=> {
    next(error);
  })
}

module.exports = {
  getUserInfo, createUser, updateProfileInfo, updateProfileAvatar, login,
};
