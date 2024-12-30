const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./chatroom.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create Users table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, discordId TEXT UNIQUE, username TEXT, email TEXT, avatar TEXT, guilds TEXT)");
});

module.exports = db;
