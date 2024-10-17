const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware for JSON
app.use(express.json());

// Import register and login routes
const registerRoutes = require('./routes/register/auth');
const loginRoutes = require('./routes/login/auth');
const profileRoute = require('./routes/profiles/profile');

// Use the routes
app.use('/api/auth', registerRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/user', profileRoute);


// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,  // This ensures correct URL parsing.
  // useUnifiedTopology: true  // This ensures proper behavior with MongoDB's new connection engine.
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit if there's a MongoDB connection error
  });