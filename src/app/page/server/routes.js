
var express         = require('express');
var router          = express.Router();
var PagesController = require('./controllers/pages');

router.route('/')
.get(function(req, res){
    res.send('pages home');
});

router.route('/:project_id')
.get(PagesController.all);

router.route('/:project_id/:page_idx')
.get(PagesController.find);

module.exports  = router;