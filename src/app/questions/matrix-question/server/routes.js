
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('matrix questions home');
})
.post(function(req, res){
    console.log(req.body);
    res.send('received matrix post data');
});

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/questions/matrix', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/questions/matrix'); 
    nsp.on('connection', function (socket) {
        console.log('Matrix Socket Namespace Connected');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}; 
