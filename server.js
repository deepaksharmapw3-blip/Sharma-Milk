const express = require('express');
const app = express();
const port = 4000;
const db = require('./database');
const passport = require('./auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS from the frontend during development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(passport.initialize());

// API endpoints
app.get('/sweets', (req, res) => {
    db.Sweets.find().then((sweets) => {
        res.json(sweets);
    });
});

app.get('/sweets/:id', (req, res) => {
    db.Sweets.findById(req.params.id).then((sweet) => {
        res.json(sweet);
    });
});

app.post('/sweets', (req, res) => {
    const { name, image, price, category, description } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'name and price are required' });
    }

    const sweet = new db.Sweets({ name, image, price, category, description });
    sweet.save()
        .then((createdSweet) => {
            res.status(201).json(createdSweet);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Delete a sweet by id
app.delete('/sweets/:id', (req, res) => {
    const id = req.params.id;
    if (typeof db.Sweets.findByIdAndDelete === 'function') {
        db.Sweets.findByIdAndDelete(id)
            .then((deleted) => {
                if (!deleted) return res.status(404).json({ error: 'sweet not found' });
                res.json({ success: true, deleted });
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    } else {
        res.status(500).json({ error: 'delete not supported by DB driver' });
    }
});

app.post('/orders', passport.authenticate('local', { session: false }), (req, res) => {
    const order = new db.Order(req.body);
    order.save().then((order) => {
        res.json(order);
    });
});

app.get('/orders', passport.authenticate('local', { session: false }), (req, res) => {
    db.Order.find().then((orders) => {
        res.json(orders);
    });
});

app.get('/orders/:id', passport.authenticate('local', { session: false }), (req, res) => {
    db.Order.findById(req.params.id).then((order) => {
        res.json(order);
    });
});

app.get('/orders/track/:id', (req, res) => {
    db.Order.findById(req.params.id)
        .then((order) => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(order);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Invalid order code or database error' });
        });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});