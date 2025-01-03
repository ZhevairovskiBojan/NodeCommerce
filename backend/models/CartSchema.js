const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Must be a valid ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);

