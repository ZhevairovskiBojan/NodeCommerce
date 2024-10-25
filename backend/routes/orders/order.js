const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const Order = require('../../models/OrderSchema');

// Get all orders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch orders' });
  }
});

// Create a new order (for testing purposes)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = new Order({
      user: req.user,
      items,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create order' });
  }
});

module.exports = router;
