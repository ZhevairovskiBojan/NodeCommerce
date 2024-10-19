const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the request header
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, role: decoded.role }; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
