const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// importing the routes for use
const productRoutes = require('./routes/products');
const riviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');

const ejsMate = require('ejs-mate');
var methodOverride = require('method-override');
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const PORT = 5000;


mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app')
    .then(() => {
        console.log("DB Connected!!");
    })
    .catch((e) => {
        console.log(e);
    })

// session config for express session npm
const sessionConfig = {
    secret: 'This key is secret',
    resave: false,
    saveUninitialized: true
}

// telling express that we will use the ejs as ejsMate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

// using express-session npm
app.use(session(sessionConfig))

// using connect-flash
app.use(connectFlash());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.reject = req.flash('reject');
    next();
});

// initializing middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// telling passport to check for username and password
// authenticate() static methods from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));

// this tells passport to use passport-local-mongoose to add or remove user from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(productRoutes);
app.use(riviewRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send('Working Fine');
});

app.listen(PORT, () => {
    console.log('Server is up at port', PORT);
});