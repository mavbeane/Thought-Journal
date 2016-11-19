var models = require('../models');
var express = require('express');
var router = express.Router();

/*
router.use(function(req, res, next) {
    if (req.session.user_email == undefined) {
        return res.render('index');
    } else {
        next();
    }
});
*/

router.get('/', function(req, res) {
    if (req.session.user_email == undefined) {
        res.redirect('/users/sign-in')
    } else {
        models.Thought.findAll({
            where: {
                user_id: req.session.user_id,
            }
        }).then(function(thoughts) {
            res.render('thoughts/index', {
                // user_id: req.session.user_id,
                // email: req.session.user_email,
                // logged_in: req.session.logged_in,
                thoughts: thoughts
            });
        });
    }

});
router.get('/list', function(req, res) {
    if (req.session.user_email == undefined) {
        res.redirect('/users/sign-in')
    } else {
        models.Thought.findAll({
            where: {
                user_id: req.session.user_id,
            }
        }).then(function(thoughts) {
            res.render('thoughts/list', {
                // user_id: req.session.user_id,
                // email: req.session.user_email,
                // logged_in: req.session.logged_in,
                thoughts: thoughts
            });
        });
    }

});
router.get('/new', function(req, res) {
    if (req.session.user_email == undefined) {
        res.redirect('/users/sign-in')
    } else {
        res.render('thoughts/new');
    }
});

router.post('/create', function(req, res) {
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