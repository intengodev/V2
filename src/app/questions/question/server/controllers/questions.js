
//QuestionController

var mongoose 		                = require('mongoose');
var QuestionModel                   = require('../models/question');
var Question 		                = mongoose.model('Question');

//Controllers
global.CheckboxQuestionController   = require('./../../../checkbox-question/server/controllers/checkbox.controller');
global.MatrixQuestionController     = require('./../../../matrix-question/server/controllers/matrix.controller');
global.RatingQuestionController     = require('./../../../rating-question/server/controllers/rating.controller');

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

exports.proxyEvents = function(dto){
    let type        = dto.type;
    let resolver    = `${uc(type)}QuestionController`;

    console.log('proxying data to: ' + resolver);
    return global[resolver].save(dto);
}

/**
 * Utility Methods
 */
function uc(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}