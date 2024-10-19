const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');
const router = express.Router();

// Admin-only route to manage products
router.get('/products', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.send('Welcome Admin! You can manage products here.');
});

module.exports = router;

