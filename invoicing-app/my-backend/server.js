// server.js

const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '654321', 
    database: 'invoicing_app' 
});

// Check connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Set up a simple route to fetch data from the database
app.get('/data', (req, res) => {
    db.query('SELECT * FROM your_table_name', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
