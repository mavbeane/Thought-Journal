// Dependencies
var express = require('express');
var path = require('path');
var models = require("./models");
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override'); // for deletes in express
var debug = require('debug')('express-example');

// Model controllers
var main_controller = require('./controllers/main_controller');
var thoughts_controller = require('./controllers/thoughts_controller');
var users_controller = require('./controllers/users_controller');
var analytics_controller = require('./controllers/analytics_controller');


// Express + port 
var app = express();
app.set('port', process.env.PORT || 3000);


// override POST
app.use(methodOverride('_method'))

// Sessions settings
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }));
app.use(cookieParser());

// Views
app.set('views', path.join(__dirname, 'views'));

//Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main_controller);
app.use('/thoughts', thoughts_controller);
app.use('/users', users_controller);
app.use('/analytics', analytics_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    })
});

models.sequelize.sync().then(function() {
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});

// our module get's exported as app.
module.exports = app;