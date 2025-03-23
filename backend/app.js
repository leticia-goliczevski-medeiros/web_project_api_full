const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const { cardsRouter } = require('./routes/cards');
const { userRouter } = require('./routes/users');
const { authorize } = require('./middlewares/auth');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://0.0.0.0:27017/aroundb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '678f8f17a6dfa35e58861fa0',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  })
}), createUser);

app.use('/cards', authorize, cardsRouter);
app.use('/users', authorize, userRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
