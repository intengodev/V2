
var express             = require('express');
var router              = express.Router();

var QuestionsController = require('./controllers/questions');

router.route('/')
.get(function(req, res){
    res.send('questions home');
});

router.route('/:project_id')
.get(QuestionsController.all);

router.route('/:project_id/:page_idx')
.get(QuestionsController.find);

module.exports  = router;