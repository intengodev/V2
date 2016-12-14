
var middleware = require('./../../platform/middleware')

module.exports = {
    "app_root": __dirname + "/../../",
    "engine": {
        "name": "express",
        "port": 8080
    },
    "configurables": [
        "statics",
        "packages",
        "core_packages"
    ], 
    "statics" : [
        'dist',
        'src'
    ],
    "middleware": middleware,
    packages: [
        'project',
        'page',
        'response',
        'participant',
        'user',
        'questions/checkbox-question',
        'questions/matrix-question',
        'questions/question'
    ],
    "core_packages": [
        "socket.io"
    ]
};