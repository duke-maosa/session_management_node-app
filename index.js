// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session middleware
app.use(session({
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
}));

// Routes for authentication
app.get('/login', (req, res) => {
  // Simulate user authentication (e.g., using username and password)
  req.session.user = { id: 1, username: 'user123' };
  res.send('Logged in successfully!');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.send('Logged out successfully!');
  });
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

// Protected route example
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Welcome to Dashboard, ${req.session.user.username}!`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
