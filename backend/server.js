// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware for JSON
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); // Exit if there's a MongoDB connection error
    });