const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');  

router.post('/send-message', (req, res) => {
  const { content, userId } = req.body;

  // Check if required fields are provided
  if (!content || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert the message into the database
  const query = `
    INSERT INTO messages (content, user_id, created_at)
    VALUES (?, ?, datetime('now'))
  `;

  db.run(query, [content, userId], function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }

    res.status(201).json({
      id: this.lastID,
      content,
      userId
    });
  });
});

module.exports = router;
