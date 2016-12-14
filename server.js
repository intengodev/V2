
/**
 * TODOS:
 * - Figure out how to get typescript on this asap. 
 * - Make this editable via the backend
 * 
 * See the platform/readme.md for more info 
 * */ 

//Initialize the server engine && app core
var engine = require(__dirname + '/platform/engine');
var core   = require(__dirname + '/platform/core')(engine);
 
module.exports = core.engine.app;