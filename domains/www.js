var express = require('express')
  , app = module.exports = express()
  , iai = require('./iai')
  , log = iai.log
;

//
// SETUP
//

// defaults for all environments
app.set('port', 8080);
app.set('views', __dirname+'/views')
app.set('view engine', 'jade')

app.set('title', 'lorenzogrv.com');

// development only
app.configure('development', function() {
  app.use(express.logger('dev'));
});

// test only
app.configure('test', function() {
  app.set('port', 3000);
  app.use(express.logger('dev'));
});

// production only

//
// MIDDLEWARE
//

// iai modules mapping
iai.admin.init(app);
;

// app router before error handler
app.use(app.router);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

//
// ROUTING
//

app.get('*', function(req, res){
  res.send(404, 'Page not Found');
});

//
// SERVER START
//

if(!module.parent) {
  iai.start(app);
}
