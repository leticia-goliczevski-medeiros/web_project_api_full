const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorização necessária.' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_KEY || 'devMode');
  } catch (err) {
    return res.status(401).send({ message: 'Autorização necessária.' });
  }

  req.user = payload;
  return next();
}

module.exports = { authorize };
