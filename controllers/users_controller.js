var bcrypyt = require('bcryptjs');
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/new', function(req, res) {
    res.render('users/new');
});

router.get('sign-in', function(req, res) {
    res.render('users/sign_in');
});

router.get('/sign-out', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


//login
router.post('/login', function(req, result) {
    models.Users.findOne({
        where: { email: req.body.email }
    }).then(function(users) {
        if (users == null) {
            res.redirect('/users/sign-in')
        }

        bcrypt.compare(req.body.password, users.password, function(err, result) {
            if (result == true) {
                req.session.logged_in == true;
                req.session.username = users.username;
                req.session.user_id = users.id;
                req.session.user_email = users.email;
                res.redirect('/');
            } else {
                res.redirect('/users/sign-in')
            }
        });
    });
});

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
                        email: req.body.email,
                        password: hash
                    }).then(function(users) {
                        req.session.logged_in = true;
                        req.session.username = users.username;
                        req.session.user_id = users.id;
                        res.session.user_email = users.email;
                        res.redirect('/');
                    });
                })
            });
        }

    });
});

module.exports = router;