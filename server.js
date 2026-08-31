const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection using your credentials
/*const db = mysql.createConnection({
    host: "dbapp.c7s00ociw8pq.eu-north-1.rds.amazonaws.com" ,
    user:  "Ajit",
    password: "Shrikant9674",
    database: "dbapp",
    port:  3306
});*/
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,   // लक्षात ठेव: DB_PASS, DB_PASSWORD नाही
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database: app_db as Ajit');
});

// Handle Form Submit Button Click
app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data to database.');
        }
        res.send('<h3>Data stored successfully in MySQL! <a href="/">Go Back</a></h3>');
    });
});

// Start Server
app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
