var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user_email == undefined) {
        res.redirect('/users/sign-in')
    } else {
        res.redirect('/thoughts');
    }

});

module.exports = router;