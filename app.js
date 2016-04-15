var express = require('express');
var pipeline = require('./infrastructure/pipeline.js');
var errorHandling = require('./infrastructure/errorHandling.js');
var routing = require('./infrastructure/routing.js');
var dataAccess = require('./infrastructure/dataAccess.js');
var security = require('./infrastructure/security.js');

var app = express();

pipeline.setup(app);
security.setup(app)
routing.setup(app);
errorHandling.setup(app);
dataAccess.setup();

module.exports = app;
