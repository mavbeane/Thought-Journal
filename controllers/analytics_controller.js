var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user_email == undefined) {
        res.redirect('/users/sign-in')
    } else {
        models.Thought.findAll({
            where: {
                user_id: req.session.user_id,
            }
        }).then(function(thoughts) {
            res.render('analytics/index', {
                // user_id: req.session.user_id,
                // email: req.session.user_email,
                // logged_in: req.session.logged_in,
                thoughts: thoughts
            });
        });
    }

});

module.exports = router;