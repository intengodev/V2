
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('projects home');
});

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/projects', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/projects'); 
    nsp.on('connection', function (socket) {
        console.log('Projects Socket Namespace Connected');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}; 
