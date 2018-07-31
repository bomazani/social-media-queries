const { Client } = require('pg');
const express = require('express');

// pulled this code from npm site for yarn install.
const install = require('yarn-install');

const app = express();
app.use(express.json());

const client = new Client({
    database: 'social-media'
});


// route handlers go here
app.get('/users', function (req, res) {
    client.query('SELECT * FROM users', (err,result) => {
        res.send(result.rows);
    });    
});


app.post('/users', function (req, res) {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps. Students have the option of attending the program in person, or remotely via our Hybrid Program.'];
    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
    })
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
    client.connect();
});