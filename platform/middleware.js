
/**
 * Middleware
 * When installing middleware:
 * 1) Install it via npm
 * 2) Add it to this file by giving it a name and then the 
 *    value that the middleware should register.
 */

var logger                      = require('morgan');
var cookieParser                = require('cookie-parser');
var bodyParser                  = require('body-parser'); 

module.exports = function(app){
return [
{
    "name": "cors",
    "val" : function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }
},
{
    "name": "morgan",
    "val":  logger('dev')
},
{
    "name": "body-parser-json",
    "val": bodyParser.json()
},
{
    "name": "body-parser-urlencoded",
    "val": bodyParser.urlencoded({ extended: false })
},
{
    "name": "cookie-parser",
    "val" : cookieParser()
}];
}