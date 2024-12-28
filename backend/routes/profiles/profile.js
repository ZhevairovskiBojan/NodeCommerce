const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const User = require('../../models/UserSchema');  
const router = express.Router();

// Protected Dashboard Route
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch the user by ID and exclude the password field
    const user = await User.findById(req.user).select('-password');
    
    // If user not found
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the user data
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;


