
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('questions home');
});

router.route('/:project_id/:page_idx')
.get(function(req, res){
    res.send('matching questions for project ' + req.params.project_id + ' and page ' + req.params.page_idx);
});

module.exports  = router;