
var express                     = require('express');
var router                      = express.Router();

var QuestionsController         = require('./controllers/questions');

router.route('/')
.get(function(req, res){
    res.send('questions home');
});

router.route('/:project_id')
.get(QuestionsController.all);

router.route('/:project_id/:page_idx')
.get(QuestionsController.find);

module.exports  = function(app, io){
    //Mount the route
    app.use('/api/questions', router);

    //Attatch the socket to the root of the route
    var nsp = io.of('/api/questions'); 
    nsp.on('connection', function (socket) {
        console.log('Questions Socket Namespace Connected');
        
        socket.on('question:save', function(dto){            
            var resp = QuestionsController.proxyEvents(dto);

            if(resp.status == 'success'){
                socket.emit('questions:success', dto);
            } else {
                socket.emit('questions:error', dto);
            }
        });
    });
}; 
