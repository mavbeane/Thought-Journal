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

//Static Content
app.use('/static', express.static('public/assets'));

//routes
require('./routing/html-routes.js')(app);

//sequelize models object
var models = require('./models');

//Sync models
var sequelizeConnection = models.sequelize;

// We run this query so that we can drop our tables even though they have foreign keys
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// make our tables
// note: force:true drops the table if it already exists
.then(function() {
    return sequelizeConnection.sync({ force: true })
})


app.listen(3000, function() {
    console.log('Listening on port 3000')
});