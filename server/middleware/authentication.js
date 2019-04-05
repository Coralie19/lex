const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice('Bearer '.length);
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    res
      .status(401)
      .set('Content-Type', 'text/plain')
      .send('Not authorized');
  }
};
