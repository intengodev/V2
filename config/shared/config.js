module.exports = {
    "app_root": __dirname + "/../../",
    "configurables": [
        "statics",
        "packages",
        "core_packages"
    ], 
    "statics" : [
        'dist',
        'src'
    ],
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