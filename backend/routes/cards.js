const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCard);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:id/likes', likeCard);

cardsRouter.delete('/:id/likes', dislikeCard);

module.exports = { cardsRouter };
