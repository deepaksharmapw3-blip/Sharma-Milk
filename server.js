require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./database');
const { passport, generateToken, requireJWT } = require('./auth');
const productRoutes = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — use env variable so it works in production too
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(passport.initialize());

// ─── Products ────────────────────────────────────────────────────────────────
app.use('/products', productRoutes);

// ─── Auth ────────────────────────────────────────────────────────────────────

// POST /login — returns a JWT token
app.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
        const token = generateToken(user);
        res.json({ token, username: user.username });
    })(req, res, next);
});

// ─── Sweets ──────────────────────────────────────────────────────────────────

app.get('/sweets', (req, res) => {
    db.Sweets.find()
        .then((sweets) => res.json(sweets))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/sweets/:id', (req, res) => {
    db.Sweets.findById(req.params.id)
        .then((sweet) => {
            if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
            res.json(sweet);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin only: add a sweet
app.post('/sweets', requireJWT, (req, res) => {
    const { name, image, price, category, description } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'name and price are required' });
    }
    const sweet = new db.Sweets({ name, image, price, category, description });
    sweet.save()
        .then((createdSweet) => res.status(201).json(createdSweet))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin only: delete a sweet
app.delete('/sweets/:id', requireJWT, (req, res) => {
    db.Sweets.findByIdAndDelete(req.params.id)
        .then((deleted) => {
            if (!deleted) return res.status(404).json({ error: 'Sweet not found' });
            res.json({ success: true, deleted });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// ─── Orders ──────────────────────────────────────────────────────────────────

// Public: place an order (no login needed for customers)
app.post('/orders', (req, res) => {
    const { items, customerName, customerEmail, customerPhone, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'items array is required' });
    }
    if (!total) {
        return res.status(400).json({ error: 'total is required' });
    }
    const order = new db.Order({ items, customerName, customerEmail, customerPhone, total, status: 'pending' });
    order.save()
        .then((savedOrder) => res.status(201).json(savedOrder))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Public: track an order by ID
app.get('/orders/:id', (req, res) => {
    db.Order.findById(req.params.id)
        .then((order) => {
            if (!order) return res.status(404).json({ error: 'Order not found' });
            res.json(order);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin only: list all orders
app.get('/orders', requireJWT, (req, res) => {
    db.Order.find()
        .then((orders) => res.json(orders))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Admin only: update order status
app.patch('/orders/:id/status', requireJWT, (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    }
    db.Order.findByIdAndUpdate(req.params.id, { $set: { status } })
        .then((updated) => {
            if (!updated) return res.status(404).json({ error: 'Order not found' });
            res.json(updated);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Note: /orders/:id handles order lookup — no duplicate route needed

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// ─── Payments (Razorpay UPI) ──────────────────────────────────────────────────
const { createPaymentOrder, verifyPayment } = require('./razorpay-route');

// Create a Razorpay order (called just before showing the UPI popup)
app.post('/payment/create-order', createPaymentOrder);

// Verify payment signature after UPI payment succeeds
app.post('/payment/verify', verifyPayment);
