const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const passportConfig = require('./config/passportConfig');
const isAuthenticated = require('./middlewares/isAuthenticated');

dotenv.config();

const app = express();

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(userRoutes);

// Handle the Discord callback after authentication
app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to dashboard on successful login
    res.redirect('/dashboard');
  }
);

// Protected route example
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
