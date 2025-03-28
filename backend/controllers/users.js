const validator = require('validator');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ServerError = require('../errors/serverError');
const InvalidDataError = require('../errors/invalidDataError');

function getUser(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`Não foi possível encontrar o usuário com o id ${userId}`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

function updateProfileInfo(req, res, next) {
  const userId = req.user._id;
  const { name, about } = req.body;

  if (!name || !about) {
    throw new InvalidDataError('Não foi possível atualizar os dados do usuário. Dados incompletos.');
  }

  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => {
      throw new ServerError(`Não foi possível atualizar o usuário ${name}`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

function updateProfilePicture(req, res, next) {
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
    .orFail(() => {
      throw new ServerError('Não foi possível atualizar a foto de usuário.');
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  getUser, updateProfileInfo, updateProfilePicture,
};
