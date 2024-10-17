const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.send(`Welcome User ID: ${req.user}`);
});

module.exports = router;
