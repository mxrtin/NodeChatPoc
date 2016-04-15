var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var express             = require('express');
var path                = require('path');
var logger              = require('morgan');

var pipelinePlugin = function(){
    this.setup = function(app){
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
    }
}

module.exports = new pipelinePlugin();