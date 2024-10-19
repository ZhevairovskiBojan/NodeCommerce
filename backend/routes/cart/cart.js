const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const Cart = require('../../models/CartSchema');
const Product = require('../../models/ProductSchema');
const router = express.Router();

// Add product to cart
router.post('/add', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      cart = new Cart({ user: req.user, products: [] });
    }

    // Check if the product is already in the cart
    const productInCart = cart.products.find((item) => item.product.toString() === productId);

    if (productInCart) {
      // Update quantity if product is already in the cart
      productInCart.quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// View user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart is empty' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
