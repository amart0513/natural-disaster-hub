const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT id, name, email, role FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

module.exports = router;

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const name = email.split('@')[0];
  const role = 'requester';

  const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ message: 'Database error during registration.' });
    }
    res.status(200).json({ message: 'User registered successfully.' });
  });
});
