
/**
 * See the platform/readme.md for more info 
 * */ 

//Initialize the server engine && app core
var engine = require(__dirname + '/platform/engine');
var core   = require(__dirname + '/platform/core')(engine);
 
module.exports = core.engine.app;