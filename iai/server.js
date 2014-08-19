var iai = require('./index')
  , log = iai.log
  , f = require('util').format
  , express = require('express')
;

// create and start server for app
// returns the new instance of http.Server
module.exports.start = function(app, callback) {
  // check needed settings
  var set = app.settings;
  if( !set.domain ) app.set('domain', 'localhost');
  if( !set.port ) app.set('port', 8080);

  // start server, store it on app
  return app.server = app.listen(set.port, function(){
    // add url property to server
    this.url = f('http://%s:%s', set.domain, set.port);
    // log info msg on server start
    log()
      .msg('Server listening on %s', this.url)
      .as('info')
    ;
    // log info msg on close event too
    this.on('close', function(){
      log()
        .msg('Server closed')
        .as('info')
    });
    // callback if given
    if('function' == typeof callback)
      callback(app.server);
  });
};

module.exports.reset = function(app, callback){
  app.server.close(function(){
     log('must start again now');
  });
};
