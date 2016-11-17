// Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

//Model controllers
var main_controller = require('./controllers/main_controller');
var entries_controller = require('./controllers/entries_controller');
var users_controller = require('./controllers/users_controller')

//Express settings
var app = express();
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'applications/vnd.api+json' }));

app.use('/', main_controller);
app.use('/entries', entries_controller);
app.use('/users', users_controller);

//Static Content
app.use(express.static(path.join(__dirname, 'public')));

//Sessions settings
app.use(methodOverride('_method'));
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));


//Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//sequelize models object
var models = require('./models');

//Sync models
var sequelizeConnection = models.sequelize;

// We run this query so that we can drop our tables even though they have foreign keys
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function() {
        return sequelizeConnection.sync();
    })


models.sequelize.sync().then(function() {
    var server = app.listen(app.get('port'), function() {
        console.log('Listening on port 3000')
    });
});

//catch 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    })
});

module.exports = app;