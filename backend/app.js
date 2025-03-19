const express = require('express');
const mongoose = require('mongoose');
const { cardsRouter } = require('./routes/cards');
const { userRouter } = require('./routes/users');

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

app.use('/cards', cardsRouter);
app.use('/users', userRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
