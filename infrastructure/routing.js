var users           = require('../routes/users');

var routingPlugin = function(){
    this.setup = function(app){
        app.use('/users', users);
    }
}

module.exports = new routingPlugin();