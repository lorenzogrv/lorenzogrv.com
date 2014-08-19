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
app.set('domain', 'lorenzogrv.com');
app.set('view engine', 'jade');

// development only
app.configure('development', function() {
  app.use(express.logger('dev'));
  app.set('domain', 'lorenzogrv.loc');
/*  app.set('domain map', {
    'lorenzogrv.loc'
  });*/
});

// test only
app.configure('test', function() {
  app.set('port', 3000);
  app.set('domain', 'lgrv.loc');
  app.use(express.logger('dev'));
});

// production only

//
// MIDDLEWARE
//

//app.use(express.favicon('media/favicon.ico'));
app.use(require('less-middleware')({ src : 'media'}));
app.use(express.static('media'));


// error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

//
// ROUTING
//

// url-construct helper
var url = function(path){ return path; };
url.media = function(path){
  return url.apply(url, arguments);
};

// View helpers
app.locals({
  url: url
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('*', function(req, res){
  //console.log(req.host.replace(app.get('domain'), ''));
  res.send(404, 'Page not Found');
});

//
// SERVER START
//

if(!module.parent) {
  iai.start(app);
}
