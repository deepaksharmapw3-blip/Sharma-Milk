const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
    { id: '1', username: 'admin', password: 'password' },
];

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find((item) => item.username === username && item.password === password);
    if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((item) => item.id === id);
    done(null, user || false);
});

module.exports = passport;