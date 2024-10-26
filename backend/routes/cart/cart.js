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

    // Check if the item already exists in the cart
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
    console.error('Error adding item to cart:', err.message);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate('items.product');

    // If cart doesn't exist, return an empty items array
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

module.exports = router;
