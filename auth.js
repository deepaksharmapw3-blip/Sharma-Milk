require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

// Hashed password stored securely — not plaintext
// Default: admin / password  (hash generated via bcrypt.hashSync)
const users = [
    {
        id: '1',
        username: process.env.ADMIN_USERNAME || 'admin',
        // bcrypt hash of the ADMIN_PASSWORD env var, or 'password' as fallback
        passwordHash: process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password', 10),
    },
];

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
    }
    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid) {
        return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user || false);
});

// Generate a JWT token for the authenticated user
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
}

// Middleware: verify JWT token on protected routes
function requireJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { passport, generateToken, requireJWT };
