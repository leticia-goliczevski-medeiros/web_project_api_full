const express = require('express');
const mongoose = require('mongoose');
const { cardsRouter } = require('./routes/cardsRoutes');
const { userRouter } = require('./routes/usersRoutes');
const { authRouter } = require('./routes/authRoutes');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { authorize } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://0.0.0.0:27017/aroundb');

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

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
