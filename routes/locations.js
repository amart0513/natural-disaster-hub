const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM locations', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

module.exports = router;

router.get('/all', (req, res) => {
  db.query('SELECT id, name FROM locations', (err, results) => {
    if (err) {
      console.error('Failed to fetch locations:', err);
      return res.status(500).json({ message: 'Database error fetching locations.' });
    }
    res.json(results);
  });
});
