
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

module.exports  = router;