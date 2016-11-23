
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('questions home');
});

module.exports  = router;