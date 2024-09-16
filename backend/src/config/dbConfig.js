const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cafe',
  port: 3306 // Ensure the port is correct
});

// Promisify for Node.js async/await
const db = pool.promise();

// Test the connection
db.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
