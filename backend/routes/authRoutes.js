const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start Discord authentication
router.get('/auth/discord', passport.authenticate('discord'));

// Route to handle Discord callback
router.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to dashboard on successful login
    res.redirect('/dashboard');
  }
);

module.exports = router;
