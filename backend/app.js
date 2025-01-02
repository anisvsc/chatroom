// app.js - Express setup with Passport, session, and routes

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const passportConfig = require('./config/passportConfig');
const isAuthenticated = require('./middlewares/isAuthenticated');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
  },
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Use the routes
app.use(authRoutes);
app.use(userRoutes);
app.use('/api', messageRoutes);

// Handle Discord callback after authentication
app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');  // Redirect to dashboard on successful login
});

// Protected route example
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Something went wrong.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
