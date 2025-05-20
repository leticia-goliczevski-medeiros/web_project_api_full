require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { cardsRouter } = require('./routes/cardsRoutes');
const { userRouter } = require('./routes/usersRoutes');
const { authRouter } = require('./routes/authRoutes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authorize } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.get('/test-health', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Banco de dados conectado!'))
  .catch((error) => console.log('Erro ao conectar o banco de dados: ', error));

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(requestLogger);

app.use(authRouter);

app.use(authorize, cardsRouter);
app.use(authorize, userRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${process.env.PORT || 3000}`);
});
