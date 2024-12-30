const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const db = require('./db');
const dotenv = require('dotenv');


dotenv.config();


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      done(err, null);
    } else {
      done(null, user);
    }
  });
});

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify', 'email', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  db.get('SELECT * FROM users WHERE discordId = ?', [profile.id], (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      const guilds = JSON.stringify(profile.guilds);
      db.run('INSERT INTO users (discordId, username, email, avatar, guilds) VALUES (?, ?, ?, ?, ?)',
        [profile.id, profile.username, profile.email, profile.avatar, guilds],
        function (err) {
          if (err) {
            return done(err);
          }
          return done(null, { id: this.lastID, ...profile });
        });
    } else {
      return done(null, user);
    }
  });
}));
