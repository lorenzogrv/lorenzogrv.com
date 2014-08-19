// force 'test' environmet
process.env.NODE_ENV = 'test';

// get the application and some utils to test it
var app = require('./../server')
  , iai = require('./../iai')
  , Browser = require('zombie')
  , assert = require('assert')
  , util = require('util')
  , f = util.format
;

// describe the test
describe('main home page', function() {
  before(function(done){
    this.server = iai.start(app, done);
  });
  before(function(done){
    this.browser = new Browser();

    log('visit', f('http://www.%s:%s/', app.get('domain'), app.get('port')));

    this.browser
      .visit(f('http://www.%s:%s/', app.get('domain'), app.get('port')))
      .finally(done)
  });
  it('should redirect from www to "" subdomain', function(){
    assert(this.browser.success, this.browser.error.message)
  });
/*
  it('should success', function(){
    assert(this.browser.success, this.browser.error);
  })
  it('should display the app title as head title', function(){
    assert(this.browser.text('title') == app.get('title'));
  })
  it('should display the app title as h1', function(){
    assert(this.browser.text('h1') == app.get('title'));
  })
  it('should display allowed actions to do')
*/
  after(function(done) {
    this.browser.close();
    this.server.close(done);
  });
});
