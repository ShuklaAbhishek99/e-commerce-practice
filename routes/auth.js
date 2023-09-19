const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

// router.get('/random', (req, res)=>{
//     res.send('Working Fine')
// })

// router.get('/fakeuser', async (req, res)=>{
//     const user = {
//         email: 'Abhishekshukla@gmail.com',
//         username: 'Abhishek'
//     }

//     const newUser = await User.register(user, '1234');

//     res.send(newUser);
// })

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const user = new User({ username, email, role });
        const newUser = await User.register(user, password);

        req.logIn(newUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome, You are registered successfully!');
            res.redirect('/products');
        });
    } catch (error) {
        req.flash('reject', error.message)
        res.redirect('/signup');
    }
});

router.post('/login',
    // if failure in login then this method will show
    passport.authenticate('local',{
            failureRedirect: '/login',
            failureFlash: true
    }),
    
    (req, res) => {
        req.flash('success', `Welcome!! ${req.user.username}`);
        res.redirect('/products');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }

        req.flash('success', 'GoodBye! You are logged out.');
        // console.log('You have Logged Out!');
        res.redirect('/products');
    });
});

module.exports = router;