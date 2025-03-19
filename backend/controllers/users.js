const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const INVALID_DATA = 400;
const DOCUMENT_NOT_FOUND = 404;
const SERVER_ERROR = 500;

function getUsers(req, res) {
  User.find({})
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      res.status(DOCUMENT_NOT_FOUND).send({ message: `Não foi possível encontrar usuários: ${error}` });
    });
}

function getUser(req, res) {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch(() => {
      res.status(DOCUMENT_NOT_FOUND).send({ message: `Não foi possível encontrar o usuário com o id ${id}` });
    });
}

function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then((hash)=> User.create({ name, about, avatar, email, password: hash}))
  .then((user) => res.status(201).send(user))
  .catch(() => {
    res.status(SERVER_ERROR).send({ message: `Não foi possível criar o usuário ${name}` });
  })
}

function updateProfileInfo(req, res) {
  const userId = req.user._id;
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(INVALID_DATA).send({ message: 'Não foi possível atualizar os dados do usuário. Dados incompletos.' });
    return;
  }

  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail()
    .then((user) => res.send(user))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível atualizar o usuário ${name}` });
    });
}

function updateProfileAvatar(req, res) {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (!avatar) {
    res.status(INVALID_DATA).send({ message: 'Não foi possível atualizar a foto do usuário. Dados incompletos.' });
    return;
  }

  const avatarRegex = /https?:\/\/(www\.)?.{1,}/;
  const isAvatarValid = avatar.match(avatarRegex);

  if (!isAvatarValid) {
    res.status(INVALID_DATA).send({ message: 'Não foi possível atualizar a foto de usuário. Link do avatar inválido.' });
    return;
  }

  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível atualizar a foto de usuário. ${error}` });
    });
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
  .then((user)=> {
    const token = jwt.sign({ _id: user._id }, 'chave', { expiresIn: '7d' });

    res.send({token});
  })
  .catch((error)=> {
    res.status(401).send({ message: error.message });
  })
}

module.exports = {
  getUsers, getUser, createUser, updateProfileInfo, updateProfileAvatar, login,
};
