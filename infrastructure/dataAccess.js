var mongoose    = require('mongoose');
var config      = require('../config');

var dataAccessPlugin = function(){
    this.setup = function(){
        var connection = mongoose.connect(config.database);
        connection.then(function(){
            console.log("Connection Success");
        }).catch(function(err){
            console.log("Connection failed");
            console.log(err);
        });
    }
};

module.exports = new dataAccessPlugin();