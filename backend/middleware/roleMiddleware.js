module.exports = function(allowedRoles) {
    return function(req, res, next) {
      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied. Insufficient privileges.' });
      }
      next();
    };
  };
  

  