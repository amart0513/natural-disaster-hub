const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const disasterRoutes = require('./routes/disasters');

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/disasters', disasterRoutes);

// Serve frontend from /main folder
app.use(express.static(path.join(__dirname, 'main')));

// Optional: serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
