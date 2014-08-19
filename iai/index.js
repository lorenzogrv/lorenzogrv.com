var util = require('util')
  , f = util.format
  , colors = require('colors')
;

colors.setTheme({
  prompt: 'grey'
  ,info: 'blue'
  ,debug: 'inverse'
});

// log something as 'iai'
var LOG_LEVELS = ['info'];
var IAI_PROMPT = 'IAI:'.prompt
module.exports.log = log = function(){
  // NORMAL MODE: log(args)
  if(arguments.length > 0) {
    return console.log(IAI_PROMPT, f.apply(f, arguments).debug);
  }
  // API MODE: log().msg(args).as(level)
  var message = '(empty message)';
  return {
    msg: function() {
      message = f.apply(f, arguments);
      return this;
    }
    ,as: function(level) {
      console.assert(
        LOG_LEVELS.indexOf(level) > -1, 
        f('Log level must be one of %j', LOG_LEVELS)
      );
      console.log(IAI_PROMPT, message[level]);
      return this;
    }
  };
};

// server utils
module.exports.start = require('./server').start;
module.exports.reset = require('./server').reset;

// iai routing middleware
module.exports.admin = require('./admin');
module.exports.route = function(app) {
  return {
    // route map as express' route-map example
    map: function(a, route){
      route = route || '';
      for (var key in a) {
        switch (typeof a[key]) {
          // { '/path': { ... }}
          case 'object':
            this.map(a[key], route + key);
            break;
          // get: function(){ ... }
          case 'function':
            if(app.locals.env != 'production')
              console.log('route: %s %s', key, route);
            app[key](route, a[key]);
            break;
        }
      } 
    }
  };
};
