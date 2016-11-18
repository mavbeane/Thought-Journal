var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (user == null) {
        res.redirect('/users/sign-in')
    }
    models.Thought.findAll({
            include: [models.User]
        })
        .then(function(thoughts) {
            res.render('thoughts/index', {
                user_id: req.session.user_id,
                email: req.session.user_email,
                logged_in: req.session.logged_in,
                thoughts: thoughts
            });
        });

});

router.get('/new', function(req, res) {
    if (user == null) {
        res.redirect('/users/sign-in')
    }
    res.render('thoughts/new');
});
router.post('/create', function(req, res) {
    if (user == null) {
        res.redirect('/users/sign-in')
    }
    models.Thought.create({
            entry: req.body.entry,
            colorHex: req.body.colorHex,
            word: req.body.word,
            user_id: req.session.user_id
        })
        .then(function() {
            res.redirect('/thoughts');
        })
});
/*
router.put('/update/:id', function(req, res) {
    models.Thought.update({
            entry: req.body.entry
        }, {
            where: { id: req.params.id }
        })
        .then(function(result) {
            res.redirect('/')
        });
});

router.delete('/delete/:id', function(req, res) {
    models.Thought.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.redirect('/');
        })
});
*/

module.exports = router;