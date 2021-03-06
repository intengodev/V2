
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('participants home');
});

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/participants', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/participants'); 
    nsp.on('connection', function (socket) {
        console.log('Participant Socket Namespace Connected');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}; 
