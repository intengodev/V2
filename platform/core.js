/**
 * TODOS:
 * - See if there is a better way to pass app and express instead of making the global
 * - Work on naming conventions for shared configs
 */

global.express;
global.app;
global.io;

var fs = require('fs');

/**
 * The Platform core
 */
var Core = function(app, config, express, io){
    global['_core'] = this;
    global.express  = express;
    global.app      = app;
    global.io       = io;

    this.init(app, config);
};

Core.prototype.setConfigProp = function(name, val){}

/**
 * Handles configuring the application core's capabilities
 * and configuring the basic setup
 */
Core.prototype.init = function(app, config){
    this.config = config;
    this.registerConfigurables(config);

    return this;
}

Core.prototype.registerConfigurables = function(config){
    if(typeof config.configurables == 'undefined') return;

    config.configurables.forEach(function(configurable){
        var action = 'set_' + configurable;
        var config = _core.config;
        
        if(typeof config[configurable] !== 'undefined') _core[action](config);
    });
}

//Configurable Setters
Core.prototype.set_statics = function(config){
    config.statics.forEach(function(_static){
        var path = _core.config.app_root + _static;   
        app.use(express.static(path));
    }, _core);
}

Core.prototype.set_packages = function(config){
    _core.tmp = {};
    _core.tmp.package_path = process.cwd() + '/src/app/';

    config.packages.forEach(function(package){
        var path = this.tmp.package_path + package + '/server/routes.js';
        if (fs.existsSync(path)) {
            console.log('Mounting package for path: ' + path);
            require(path)(app, io);
        } else {
            console.error('package not found at path: ' + path);
        }
    }, _core); 
}

Core.prototype.set_core_packages = function(config){
    //console.log('setting core_packages with config: ');
}

/**
 * Adds a package to the core
 * saves it to the config
 * params: toSave: boolean wether or not to register it in the config for loading
 */
Core.prototype.addPackage = function(package_name, toSave){}

module.exports  = function(app, config, express, io){
    var core = new Core(app, config, express, io);
    return core.init(app, config);
}