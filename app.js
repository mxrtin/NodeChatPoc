var express = require('express');
var pipeline = require('./infrastructure/pipeline.js');
var errorHandling = require('./infrastructure/errorHandling.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

pipeline.setup(app);

app.use('/', routes);
app.use('/users', users);
errorHandling.setup(app);

module.exports = app;
