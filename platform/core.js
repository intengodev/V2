/**
 * TODOS:
 */

var fs          = require('fs');
var logger      = require('morgan');
var _core;

/**
 * The Platform core
 */
var Core  = function(engine){
    _core           = this;
    _core.engine    = engine;
};

Core.prototype.setConfigProp = function(name, val){}

/**
 * Handles configuring the application core's capabilities
 * and configuring the basic setup
 */
Core.prototype.init = function(app, config){
    this.registerConfigurables(config);
    this.setDefaultRoutes(app);

    return this;
}

Core.prototype.setDefaultRoutes = function(app){
    //SPA Root
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'/dist/index.html'));
    });

    //API Root
    app.get('/api', function (req, res) { res.send('API Root'); });
};

/**
 * Registers configurables within the core
 */
Core.prototype.registerConfigurables = function(config){
    if(typeof config.configurables == 'undefined') return;

    config.configurables.forEach(function(configurable){
        var action = 'set_' + configurable;
        var config = _core.engine.config;
        
        if(typeof config[configurable] !== 'undefined') _core[action](config);
    });
}

//Configurable Setters
Core.prototype.set_statics = function(config){
    config.statics.forEach(function(_static){
        var path = _core.engine.config.app_root + _static;   
        this.engine.app.use(this.engine.express.static(path));
    }, _core);
}

Core.prototype.set_packages = function(config){
    _core.tmp = {};
    _core.tmp.package_path = process.cwd() + '/src/app/';

    config.packages.forEach(function(package){
        var path = this.tmp.package_path + package + '/server/routes.js';
        if (fs.existsSync(path)) {
            //console.log('Mounting package for path: ' + path);
            require(path)(this.engine.app, this.engine.io);
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

module.exports  = function(engine){
    var core = new Core(engine);
    return core.init(engine.app, engine.config);
}