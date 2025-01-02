const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

// Serialize user ID into the session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      return done(err, null);
    }
    return done(null, user);
  });
});

// Configure DiscordStrategy for Passport
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify', 'email', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  // Find user by Discord ID in the database
  db.get('SELECT * FROM users WHERE discordId = ?', [profile.id], (err, user) => {
    if (err) {
      return done(err); // Return any error from the database
    }

    if (!user) {
      // If no user found, create a new one
      const guilds = JSON.stringify(profile.guilds); // Convert guilds array to JSON string
      db.run('INSERT INTO users (discordId, username, email, avatar, guilds) VALUES (?, ?, ?, ?, ?)', 
        [profile.id, profile.username, profile.email, profile.avatar, guilds], function(err) {
          if (err) {
            return done(err); // Return error if insertion fails
          }
          // Return the user object with the inserted ID
          return done(null, { id: this.lastID, discordId: profile.id, username: profile.username, email: profile.email, avatar: profile.avatar, guilds });
        });
    } else {
      // If user already exists, return the user
      return done(null, user);
    }
  });
}));
