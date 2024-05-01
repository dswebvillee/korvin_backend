const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,  // Change this to your MySQL host
    user: process.env.DB_USER, // Change this to your MySQL username
    password: process.env.DB_PASSWORD, // Change this to your MySQL password
    database: process.env.DB_NAME // Change this to your MySQL database name
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;
