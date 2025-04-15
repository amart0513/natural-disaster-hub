const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all disaster events
router.get('/', (req, res) => {
  const query = 'SELECT * FROM disaster_events';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching disaster events:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;

