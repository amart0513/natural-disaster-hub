const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM resources', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

module.exports = router;

router.post('/add', (req, res) => {
  const { name, category, quantity, location_id } = req.body;

  const query = `
    INSERT INTO resources (name, category, quantity, location_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, category, quantity, location_id], (err, result) => {
    if (err) {
      console.error('Resource insert error:', err);
      return res.status(500).json({ message: 'Database error inserting resource.' });
    }
    res.status(200).json({ message: 'Resource added successfully.' });
  });
});
