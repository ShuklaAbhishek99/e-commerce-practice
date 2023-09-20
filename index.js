// const dotenv  = require('dotenv');
// dotenv.config();
// below code is short-hand of above code
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// importing the routes for use
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const ejsMate = require('ejs-mate');
var methodOverride = require('method-override');
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const PORT = process.env.PORT || 5000;
// DB_URL is actually a hosted url where we are hosting the app
// when that is not available it will take the other localhost url
const db_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ecommerce-app';

mongoose.connect(db_url)
    .then(() => {
        console.log("DB Connected!!");
    })
    .catch((e) => {
        console.log(e);
    })


// session config for express session npm
// const sessionConfig = {
//     secret: secretenv,
//     resave: false,
//     saveUninitialized: true
// }

// telling express that we will use the ejs as ejsMate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// from dotenv
const secret = process.env.SECRET;

// using express-session npm
app.use(session({
    store: MongoStore.create({mongoUrl: db_url}),
    secret,
    resave: false,
    saveUninitialized: true,
    // the cookie will set a time for login, when time ends it expires and logout hits 
    cookie: {
        // days hours miniutes seconds miliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

// using connect-flash
app.use(connectFlash());

// initializing middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// telling passport to check for username and password
// authenticate() static methods from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));

// this tells passport to use passport-local-mongoose to add or remove user from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// writing this below code above before serialize and deserialize the user won't get detected
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.reject = req.flash('reject');
    next();
});

// ------APIs---------
const productAPI = require('./routes/api/productapi');
const paymentAPI = require('./routes/api/paymentapi');

app.use('/products', productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productAPI);
app.use(paymentAPI);


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('Server is up at port', PORT);
});