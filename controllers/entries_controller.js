var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.Entries.findAll({
            include: [models.Users]
        })
        .then(function(entries) {
            res.render('entries/index', {
                user_id: req.session.user_id,
                email: req.session.user_email,
                logged_in: req.session.logged_in,
                entries: entries
            });
        });
});


router.post('/create', function(req, res) {

    models.Entries.create({
            entry: req.body.entry,
            colorHex: req.body.colorHex,
            word: req.body.word,
            user_id: req.session.user_id
        })
        .then(function() {
            res.redirect('/');
        })
});

router.put('/update/:id', function(req, res) {
    models.Entries.update({
            entry: req.body.entry
        }, {
            where: { id: req.params.id }
        })
        .then(function(result) {
            res.redirect('/')
        });
});
router.delete('/delete/:id', function(req, res) {
    models.Cat.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.redirect('/');
        })
});

module.exports = router;