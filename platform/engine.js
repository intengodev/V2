
var express                     = require('express');
var app                         = express();

var server                      = require('http').Server(app);
var io                          = require('socket.io')(server);

var path                        = require('path');
var db                          = require(__dirname + '/../config/dev/db');

var _engine;
var shared_config               = require(__dirname + '/../config/shared/config');

/**
 * Handles the server configuration
 */
var Engine = function(config){
    this.config = (typeof config !== 'undefined') ? config : shared_config;
    _engine = this;
};

/**
 * Setup the server and its capabilities
 */
Engine.prototype.init = function(express, app, server, io){
    this.app     = app,
    this.io      = io,
    this.express = express;
    
    this.registerMiddleware(app);
    this.listen(this.config.engine.port);

    return this;
}

/**
 * 
 */
Engine.prototype.registerMiddleware = function(app){
    this.config.middleware(app).forEach(function(middleware){
        console.log('registering middleware for: ' + middleware.name);
        app.use(middleware.val);
    }, this);
}

/**
 * Listen for engine requests on a port
 */
Engine.prototype.listen = function(port){
    var app     = this.app;
    
    //Set the ports
    if (app.get('env == "development"')){
        server.listen(port, function () {
            console.log('Example listening on port ' + port);
        });
    } else {
        server.listen(port, function () {
            console.log('App & Sockets listening on port ' + port);
        });
    }
}

module.exports = (function(config){
    var engine = new Engine(config);
    return engine.init(express, app, server, io);
}());