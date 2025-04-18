const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Route imports
const disasterRoutes = require('./routes/disasters');
const locationRoutes = require('./routes/locations');
const resourceRoutes = require('./routes/resources');
const userRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');

// API Routes
app.use('/api/disasters', disasterRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, 'main')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main/index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
