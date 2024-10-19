const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the request header
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    // Remove the 'Bearer ' prefix from the token string
    const tokenWithoutBearer = token.replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded.userId; // Add user ID from token to req object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

