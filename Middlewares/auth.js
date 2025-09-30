const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');

exports.auth = async (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const tokenData = jwt.verify(token, config.jwtSecret);
    req.user = tokenData; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
