require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { cardsRouter } = require('./routes/cardsRoutes');
const { userRouter } = require('./routes/usersRoutes');
const { authRouter } = require('./routes/authRoutes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authorize } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Banco de dados conectado!'))
.catch((error) => console.log('Erro ao conectar o banco de dados: ', error));

app.use(express.json());

app.use(requestLogger);

app.use(authRouter);

app.use(authorize, cardsRouter);
app.use(authorize, userRouter);

// app.use('/', (req, res) => {
//   res.status(404).send({ message: 'A solicitação não foi encontrada' });
// });

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listening at port ${process.env.PORT}`);
});
