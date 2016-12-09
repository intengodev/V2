
//PagesController

var mongoose 		= require('mongoose');
var PageModel       = require('../models/page');
var Page 		    = mongoose.model('Page');

exports.all = function(dto, socket){
    Page.find({"project_id" : dto.project_id }, function(err, pages){
        var resp = {};
		if (err) return resp.status = 'error';
    	
        resp.pages  = pages;
        resp.status = 'success';
       
        if(resp.status == 'success'){
            socket.emit('item:save:success', resp);
        } else {
            socket.emit('item:save:error', resp);
        } 
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