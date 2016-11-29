
//PagesController

var mongoose 		= require('mongoose');
var PageModel       = require('../models/page');
var Page 		    = mongoose.model('Page');

exports.all = function(req, res, next){
    console.log('all route');
    var project_id = req.params.project_id;

    var query = {
        "project_id" : project_id
    };

    Page.find(query, function(err, page){
		if (err) return res.send(500, { error: err });
    	return res.send(page);
	});
}

exports.find = function(req, res, next){
    console.log('find route');
    var project_id = req.params.project_id.toString().trim();
    var page_idx   = req.params.page_idx.toString().trim();

    console.log('project_id:',project_id);
    console.log('page_idx:',page_idx);

    var query = {
        "page_idx" : page_idx,
        "project_id" : project_id 
    };
    
    Page.findOne(query, function(err, page){
		if (err) return res.send(500, { error: err });
    	return res.send(page);
	});
}