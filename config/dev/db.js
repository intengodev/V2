
var settings = require(__dirname + '/settings');
var mongoose = require('mongoose');

/*
* Returns a mongoose connection
*/
module.exports = (function(settings){
    var connection = mongoose.connection;

    connection.on('error', console.error);
    connection.once('open', function() {
        console.log('Database connection established.');
    });

    mongoose.connect(settings.connection);
    
    return mongoose;
}(settings.db));