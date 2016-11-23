
var express     = require('express');
var router      = express.Router();

router.route('/')
.get(function(req, res){
    res.send('users home');
});

module.exports  = router;