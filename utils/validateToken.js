/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized, please log in' });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({
          message: 'invalid token provided',
        });
      }
      req.decodedToken = decodedToken;
      return next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error || 'see Something went wrong',
    });
  }
};

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized, please log in' });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({
          message: 'invalid token provided',
        });
      }
      req.decodedToken = decodedToken;
      if (!decodedToken.isAdmin) {
        return res.status(403).json({
          message: 'admin only route',
        });
      }
      return next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error || 'see Something went wrong',
    });
  }
};

module.exports = { verifyToken, verifyAdminToken };
