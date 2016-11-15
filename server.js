// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'applications/vnd.api+json' }));

require('./routing/html-routes.js')(app);

//Static Content
app.use('/static', express.static('public/assets'));



app.listen(3000, function() {
    console.log('Listening on port 3000')
});