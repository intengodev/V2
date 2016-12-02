
var express                     = require('express');
var app                         = express();

var server                      = require('http').Server(app);
var io                          = require('socket.io')(server);

var path                        = require('path');
var logger                      = require('morgan');
var cookieParser                = require('cookie-parser');
var bodyParser                  = require('body-parser'); 
var db                          = require(__dirname + '/config/dev/db');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Enable CORS for testing. Maybe remove later.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Set statics
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src'));

//Mount the routes and sockets
require(__dirname + '/src/app/project/server/routes')(app, io);
require(__dirname + '/src/app/page/server/routes')(app, io);
require(__dirname + '/src/app/response/server/routes')(app, io);
require(__dirname + '/src/app/participant/server/routes')(app, io);
require(__dirname + '/src/app/user/server/routes')(app, io);
require(__dirname + '/src/app/questions/checkbox-question/server/routes')(app, io);
require(__dirname + '/src/app/questions/matrix-question/server/routes')(app, io);
require(__dirname + '/src/app/questions/question/server/routes')(app, io);


//SPA Root
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

//API Root
app.get('/api', function (req, res) { res.send('API Root'); });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Set the ports
if (app.get('env == "development"')){
    server.listen(3000, function () {
        console.log('Example listening on port 3000!');
    });
} else {
    server.listen(8080, function () {
        console.log('App & Sockets listening on port 8080!');
    });
}

module.exports = app;