var mongoose        = require('mongoose');
var config          = require('../config');
var passport	    = require('passport');
var User            = require('../model/user');
var JwtStrategy     = require('passport-jwt').Strategy;

var securityPlugin = function(){
    this.setup = function(app){
        app.use(passport.initialize());
        var opts = {};
        opts.secretOrKey = config.secretOrKey;
        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({id: jwt_payload.id}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
    }
};

module.exports = new securityPlugin();