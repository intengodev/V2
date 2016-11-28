
//QuestionController

var mongoose 		= require('mongoose');
var QuestionModel   = require('../models/question');
var Question 		= mongoose.model('Question');
 
exports.all = function(req, res, next){
   var project_id = req.params.project_id;

   var query = {
        "project_id" : project_id
    };

    Question.find(query, function(err, question){
		if (err) return res.send(500, { error: err });
    	return res.send(question);
	});
}

exports.find = function(req, res, next){
    var project_id = req.params.project_id;
    var page_idx   = req.params.page_idx;

    var query = {
        "project_id" : project_id, 
        "page_idx"   : page_idx 
    };
    
    Question.find(query, function(err, question){
		if (err) return res.send(500, { error: err });
    	return res.send(question);
	});
}