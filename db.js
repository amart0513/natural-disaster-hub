const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // <-- Replace with your MySQL username
  password: 'password',   // <-- Replace with your MySQL password
  database: 'disaster_hub' // <-- Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

module.exports = connection;
