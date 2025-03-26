const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { Joi, celebrate } = require('celebrate');
const { validateURL } = require('../middlewares/validation');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateURL).required()
  })
}), createCard);

cardsRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
}), deleteCard);

cardsRouter.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
}), likeCard);

cardsRouter.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
}), dislikeCard);

module.exports = { cardsRouter };
