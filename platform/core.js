/**
 * TODOS:
 * - Work on naming conventions for shared configs
 */

global.express;
global.app;

/**
 * The Platform core
 */
var Core = function(app, config, express){
    global['_core'] = this;
    global.express  = express;
    global.app      = app;

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
        var path = __dirname + '/../' + _static;
        app.use(express.static(path));
    }, _core);
}

Core.prototype.set_packages = function(config){
    //console.log('setting packages with config: ');
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

module.exports  = function(app, config, express){
    var core = new Core(app, config, express);
    return core.init(app, config);
}