
var express         = require('express');
var router          = express.Router();
var PagesController = require('./controllers/pages');

router.route('/').get(function(req, res){
    res.send('pages home');
});

router.route('/:project_id')
.get(PagesController.all);

router.route('/:project_id/:page_idx')
.get(PagesController.find);

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/pages', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/pages'); 
    nsp.on('connection', function (socket) {
        console.log('Pages Socket Namespace Connected');
        socket.on('fetch:pages', function(dto){
            PagesController.all(dto, socket);
        });
    });
}; 
