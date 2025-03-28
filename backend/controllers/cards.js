const validator = require('validator');
const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const InvalidDataError = require('../errors/invalidDataError');
const ServerError = require('../errors/serverError');

function getCards(req, res, next) {
  Card.find({})
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Não foi possível encontrar os cards.');
    })
    .then((card) => res.send(card))
    .catch((error) => {
      next(error);
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (!name || !link) {
    throw new InvalidDataError('Não foi possível criar o card. Dados incompletos.');
  }

  const isValidLink = validator.isURL(link);

  if (!isValidLink) {
    throw new InvalidDataError(`Não foi possível criar o card ${name}. Link inválido.`);
  }

  Card.create({
    name, link, owner: userId, likes: [], createdAt: Date.now(),
  })
    .then((card) => res.send(card))
    .catch((error) => {
      next(error);
    });
}

function deleteCard(req, res, next) {
  const { id: cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new ServerError(`Não foi possível deletar o card com o id ${cardId}`);
    })
    .then((card) => res.send(card))
    .catch((error) => {
      next(error);
    });
}

function addCardLike(req, res, next) {
  const { id: cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ServerError(`Não foi possível adicionar a curtida ao card com o id ${cardId}.`);
    })
    .then((card) => res.send(card))
    .catch((error) => {
      next(error);
    });
}

function removeCardLike(req, res, next) {
  const { id: cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ServerError(`Não foi possível remover a curtida do card com o id ${cardId}.`);
    })
    .then((card) => res.send(card))
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
};
