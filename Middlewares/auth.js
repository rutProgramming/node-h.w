const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = tokenData; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
