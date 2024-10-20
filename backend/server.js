const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 

// Load environment variables
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// Import routes
const registerRoutes = require('./routes/register/auth');
const loginRoutes = require('./routes/login/auth');
const profileRoute = require('./routes/profiles/profile');
const adminRoutes = require('./routes/admin/admin');  
const orderRoutes = require('./routes/orders/order');
const cartRoutes = require('./routes/cart/cart');
const productRoutes = require('./routes/products/product');

// Use the routes
app.use('/api/auth', registerRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/user', profileRoute);
app.use('/api/admin', adminRoutes);  
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);


// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});


// Start the server
const PORT = process.env.PORT || 5000;
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