/**
 * Preview server for client
 */
var express       = require('express');
var config        = require('./config/settings.js');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
    // call favicon first
    app.use(express.favicon());
    app.use(express.logger('dev'));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.bodyParser());
    app.use(express.methodOverride());  

    app.use(express.cookieParser());
  });

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

app.configure('production', function() {
    app.use(express.errorHandler()); 
  });

global.app=app;
global.config=config;

var session = express.session({
    key    : config.app.key,
    secret : config.app.secret
  });
app.use(session);

app.configure(function() {
    app.use(app.router);

    // any static files go to 'public'
    app.use(express.static(__dirname + '/public'));

  });

// main pages
app.get('/', function(req,res) {
    res.render('index', {title:config.app.title});
  });

// init the server
if (!module.parent) {
  app.listen(Number(config.server.port));
  console.log("%s listening on port '%d' in '%s' mode", 
              config.app.name,
              app.address().port, 
              app.settings.env);
}
