// File: MyCMS/backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    console.log('Decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
