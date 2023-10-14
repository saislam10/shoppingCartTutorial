const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Database connection
const db = mysql.createConnection({
    host: 'domains.davidson.edu',
    user: 'your_name',
    password: 'your_pass',
    database: 'your_db'
});
db.connect();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [req.body.username, hashedPassword], function (error) {
        if (error) throw error;
        res.sendStatus(201);
    });
});

const SECRET_KEY = '123456';

app.post('/login', (req, res) => {
    db.query("SELECT * FROM users WHERE username = ?", [req.body.username], async function (error, results) {
        if (error) throw error;
        if (results.length > 0 && await bcrypt.compare(req.body.password, results[0].password)) {
            const token = jwt.sign({ id: results[0].id }, SECRET_KEY);
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.post('/cart', authenticate, (req, res) => {
    // authenticate is a middleware that checks the JWT
    db.query("INSERT INTO cart (user_id, item_id, quantity, name, price) VALUES (?, ?, ?, ?, ?)", [req.user.id, req.body.item_id, req.body.quantity, req.body.name, req.body.price], function (error) {
        if (error) throw error;
        res.sendStatus(201);
    });
});

app.delete('/cart/:cartId', authenticate, (req, res) => {
    // authenticate is a middleware that checks the JWT
    const cartId = req.params.cartId;
    
    db.query("DELETE FROM cart WHERE cart_id = ? AND user_id = ?", [cartId, req.user.id], function (error) {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.get('/cart', authenticate, (req, res) => {
    db.query("SELECT * FROM cart WHERE user_id = ?", [req.user.id], function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
