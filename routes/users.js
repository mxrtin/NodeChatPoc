var express       = require('express');
var router        = express.Router();
var passport	  = require('passport');

router.get('/', requiresAuthentication(), function(req, res, next) {
  res.send('respond with a resource');
});

function requiresAuthentication(){
  return passport.authenticate('jwt', { session: false});
}

module.exports = router;

