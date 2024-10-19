const express = require('express');
const User = require('../../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user with role (default to 'user' if not provided)
    user = new User({
      name,
      email,
      password,
      role: role || 'user',  // Default to 'user' if no role is provided
    });
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the new user
    await user.save();

    // Log user details before generating JWT
    console.log('User ID:', user._id);
    console.log('User Role:', user.role);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Log to verify JWT secret

    // Generate JWT token
    const payload = { userId: user._id, role: user.role };  // Include role in the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in response
    res.status(201).json({ token });
  } catch (err) {
    // Detailed error logging
    console.error('Error during registration:', err.message);
    console.error('Stack Trace:', err.stack);  // Log the stack trace for debugging
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
