const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');
const Order = require('../../models/OrderSchema');
const router = express.Router();

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    // Create a new order
    const order = new Order({
      user: req.user,  // user from the JWT
      products,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get current user's orders
router.get('/myorders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin: Get all orders
router.get('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const orders = await Order.find().populate('user', ['name', 'email']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
