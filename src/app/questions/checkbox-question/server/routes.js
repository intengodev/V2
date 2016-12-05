
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('checkbox questions home');
})
.post(function(req, res){
    console.log(req.body);
    res.send('received checkbox post data');
});

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/questions/checkbox', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/questions/checkbox'); 
    nsp.on('connection', function (socket) {
        console.log('Checkbox Socket Namespace Connected');
        socket.emit('checkbox connected on the server', { msg: 'hello world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}; 
