var iai = require('../index')
  , log = iai.log
;

function lazyLoad(name) {
  return function() {
    log()
      .msg('iai-admin module "%s" loaded now')
      .as('verbose')
    ;
    return require(name).apply({}, arguments);
  }
}

module.exports = {
  // avaliable admin modules, lazy loaded
  server: lazyLoad('./server')
  
};

module.exports.init = function(app, opts){
  // TODO opts
  if('string' == typeof opts)
    opts = { prefix: opts };
  opts = opts || { prefix: 'admin' };

  // set up configuration based on given opts
  app.locals({
    'admin title': app.get('admin title')
           || (app.get('title') + ' - iai admin')
  });
  
  return app;
}
