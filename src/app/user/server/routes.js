
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('users home');
});

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/users', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/users'); 
    nsp.on('connection', function (socket) {
        console.log('Users Socket Namespace Connected');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}; 
