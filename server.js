
var express                     = require('express');
var path                        = require('path');
var logger                      = require('morgan');
var cookieParser                = require('cookie-parser');
var bodyParser                  = require('body-parser');

var app                         = express(); 
var db                          = require(__dirname + '/config/dev/db');

var project_routes              = require(__dirname + '/src/app/project/server/routes');
var pages_routes                = require(__dirname + '/src/app/page/server/routes');
var response_routes             = require(__dirname + '/src/app/response/server/routes');
var participant_routes          = require(__dirname + '/src/app/participant/server/routes');
var user_routes                 = require(__dirname + '/src/app/user/server/routes');
var question_routes             = require(__dirname + '/src/app/questions/question/server/routes');
var checkbox_question_routes    = require(__dirname + '/src/app/questions/checkbox-question/server/routes');

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

//SPA Root
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

//API Root
app.get('/api', function (req, res) { res.send('API Root'); });

//Mount the routes
app.use('/api/projects', project_routes);
app.use('/api/pages', pages_routes);                //For writing to the file system

app.use('/api/questions', question_routes);
app.use('/api/questions/checkbox', checkbox_question_routes);

app.use('/api/responses', response_routes);
app.use('/api/participants', participant_routes);
app.use('/api/users', user_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env == "development"')){
    app.listen(3000, function () {
        console.log('Example listening on port 3000!');
    });
} else {
    app.listen(8080, function () {
        console.log('Example listening on port 8080!');
    });
}

module.exports = app;