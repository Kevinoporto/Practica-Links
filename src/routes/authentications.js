const express = require('express');
const { Passport } = require('passport/lib/index.js');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');


router.get('/signup', isNotLoggedIn, (req, res)=>{
    res.render('../views/authentication/signup.hbs')
})

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res)=>{
    res.render('../views/authentication/signin.hbs');
});

router.post('/signin', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('../views/profile.hbs');
});

router.get('/logout', isLoggedIn, (req, res, next)=>{
    req.logOut((err)=>{
        if (err){
            return next(err)
        }
        res.redirect('/signin');
    });
});

module.exports = router;