var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.

});




$('form#newEntry').submit(function(e) {

    var form = $(this);

    $.post('/', function(response) {
        alert('data has been added');


        //$('#submit').on('click', function() {

        var newEntry = {
            username: $('#user').val().trim(),
            entry: $('#entry').val(),
            color: $('.jscolor').val(),
            word: $('#word').val().trim()
        };

        sequelizeConnection.sync()
            .then(function() {

                return models.Entries.create({
                    entry: newEntry.entry,
                    colorHex: newEntry.color,
                    word: newEntry.word,
                    Users: {
                        username: newEntry.username
                    }
                }, {
                    username: [models.Users]
                })
            });


    });
});