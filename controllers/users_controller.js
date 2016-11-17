var bcrypyt = require('bcryptjs');
var models = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

router.get('/new', function(req, res) {
    res.render('users/new');
});

router.get('/sign-in', function(req, res) {
    res.render('users/sign_in');
});
router.get('/sign-out', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


//login
passport.use(new LocalStrategy(
    function(username, password, done) {
        Users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/entries',
        failureRedirect: '/login',
        failureFlash: true
    })
);

/*
router.post('/login', function(req, result) {
    models.Users.findOne({
        where: { email: req.body.email }
    }).then(function(users) {
        if (users == null) {
            res.redirect('/users/login')
        }

        bcrypt.compare(req.body.password, users.password, function(err, result) {
            if (result == true) {
                req.session.logged_in == true;
                req.session.username = users.username;
                req.session.user_id = users.id;
                req.session.user_email = users.email;
                res.redirect('/');
            } else {
                res.redirect('/users/login')
            }
        });
    });
});
*/

//Register
router.post('/create', function(req, res) {
    models.Users.findAll({
        where: { email: req.body.email }
    }).then(function(users) {

        if (users.length > 0) {
            console.log(users)
            res.send('we already have an email or username for this account');
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    models.Users.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    }).then(function(users) {
                        req.session.logged_in = true;
                        req.session.user_id = users.id;
                        req.session.username = users.username;
                        res.session.user_email = users.email;
                        res.redirect('/');
                    });
                })
            });
        }

    });
});

module.exports = router;