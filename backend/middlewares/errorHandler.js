function errorHandler(error, req, res, next) {
  const {statusCode = 500, message = 'Ocorreu um erro no servidor'} = error;

  res.status(statusCode).send({ message });
}

module.exports = { errorHandler }