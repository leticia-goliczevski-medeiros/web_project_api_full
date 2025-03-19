const Card = require('../models/card');

const INVALID_DATA = 400;
const DOCUMENT_NOT_FOUND = 404;
const SERVER_ERROR = 500;

function getCards(req, res) {
  Card.find({})
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      res.status(DOCUMENT_NOT_FOUND).send({ message: `Não foi possível encontrar os cards. ${error}` });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const userId = req.user._id;

  if (!name || !link) {
    res.status(INVALID_DATA).send({ message: 'Não foi possível criar o card. Dados incompletos.' });
    return;
  }

  const linkRegex = /https?:\/\/(www\.)?.{1,}/;
  const isValidLink = link.match(linkRegex);

  if (!isValidLink) {
    res.status(INVALID_DATA).send({ message: `Não foi possível criar o card ${name}. Link inválido.` });
    return;
  }

  Card.create({
    name, link, owner: userId, likes: [], createdAt: Date.now(),
  })
    .then((card) => res.send(card))
    .catch((error) => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível criar o card ${name}. ${error}` });
    });
}

function deleteCard(req, res) {
  const { id: cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível deletar o card com o id ${cardId}` });
    });
}

function likeCard(req, res) {
  const { id: cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível adicionar a curtida ao card com o id ${cardId}` });
    });
}

function dislikeCard(req, res) {
  const { id: cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: `Não foi possível remover a curtida do card com o id ${cardId}` });
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
