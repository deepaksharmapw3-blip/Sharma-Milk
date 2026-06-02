require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./database');
const { passport, generateToken, requireJWT } = require('./auth');
const productRoutes = require('./routes/products');
const { createPaymentOrder, verifyPayment } = require('./razorpay-route');

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow any localhost port in dev, use FRONTEND_URL in production
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin);
    const allowedOrigin = isLocalhost ? origin : FRONTEND_URL;
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use(passport.initialize());

// ─── Products ─────────────────────────────────────────────────────────────────
app.use('/products', productRoutes);

// ─── Auth ─────────────────────────────────────────────────────────────────────
app.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
        const token = generateToken(user);
        res.json({ token, username: user.username });
    })(req, res, next);
});

// ─── Sweets ───────────────────────────────────────────────────────────────────
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

app.post('/sweets', requireJWT, (req, res) => {
    const { name, image, price, category, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'name and price are required' });
    const sweet = new db.Sweets({ name, image, price, category, description });
    sweet.save()
        .then((createdSweet) => res.status(201).json(createdSweet))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete('/sweets/:id', requireJWT, (req, res) => {
    db.Sweets.findByIdAndDelete(req.params.id)
        .then((deleted) => {
            if (!deleted) return res.status(404).json({ error: 'Sweet not found' });
            res.json({ success: true, deleted });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// ─── Orders ───────────────────────────────────────────────────────────────────
app.post('/orders', (req, res) => {
    const { items, customerName, customerEmail, customerPhone, total } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0)
        return res.status(400).json({ error: 'items array is required' });
    if (!total) return res.status(400).json({ error: 'total is required' });
    const order = new db.Order({ items, customerName, customerEmail, customerPhone, total, status: 'pending' });
    order.save()
        .then((savedOrder) => res.status(201).json(savedOrder))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/orders/:id', (req, res) => {
    db.Order.findById(req.params.id)
        .then((order) => {
            if (!order) return res.status(404).json({ error: 'Order not found' });
            res.json(order);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.get('/orders', requireJWT, (req, res) => {
    db.Order.find()
        .then((orders) => res.json(orders))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.patch('/orders/:id/status', requireJWT, (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered'];
    if (!validStatuses.includes(status))
        return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
    db.Order.findByIdAndUpdate(req.params.id, { $set: { status } })
        .then((updated) => {
            if (!updated) return res.status(404).json({ error: 'Order not found' });
            res.json(updated);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// ─── Payments ─────────────────────────────────────────────────────────────────
app.post('/payment/create-order', createPaymentOrder);
app.post('/payment/verify', verifyPayment);

// ─── Contact Messages ───────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
app.post('/contact', async (req, res) => {
    try {
        const { name, phone, message } = req.body || {};
        if (!name || !phone || !message) {
            return res.status(400).json({ error: 'name, phone and message are required' });
        }

        // If MongoDB is connected, save as a mongoose model; otherwise persist to fallback file
        let saved;
        try {
            const mongoose = require('mongoose');
            if (mongoose && mongoose.connection && mongoose.connection.readyState === 1) {
                const ContactSchema = new mongoose.Schema({
                    name: String,
                    phone: String,
                    message: String,
                }, { timestamps: true });
                const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
                const c = new Contact({ name, phone, message });
                saved = await c.save();
                return res.status(201).json(saved);
            }
        } catch (e) {
            // ignore and use fallback
            console.warn('Mongo not available for contact, using fallback file');
        }

        const DATA_FILE = path.join(__dirname, 'fallback-data.json');
        let data = {};
        try {
            if (fs.existsSync(DATA_FILE)) data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || {};
        } catch (e) {
            data = {};
        }
        data.messages = data.messages || [];
        const entry = { _id: String(Date.now() + Math.random()), name, phone, message, createdAt: new Date(), updatedAt: new Date() };
        data.messages.push(entry);
        try { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8'); } catch (e) { console.warn('Failed to save contact to fallback file', e.message); }
        return res.status(201).json(entry);
    } catch (err) {
        console.error('Contact error:', err?.message || err);
        res.status(500).json({ error: err?.message || 'Failed to save message' });
    }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
