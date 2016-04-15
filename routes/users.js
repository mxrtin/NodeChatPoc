var express       = require('express');
var router        = express.Router();
var passport	  = require('passport');
var User          = require('../model/user');
var jwt           = require('jwt-simple');
var config        = require('../config');

router.get('/', requiresAuthentication(), function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Missed name or password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });

    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secretOrKey);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

function requiresAuthentication(){
  return passport.authenticate('jwt', { session: false});
}

module.exports = router;

