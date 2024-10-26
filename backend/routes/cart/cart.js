const express = require('express');
const Cart = require('../../models/CartSchema');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user });

    // If no cart, create one
    if (!cart) {
      cart = new Cart({ user: req.user, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
