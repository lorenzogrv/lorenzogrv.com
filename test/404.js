// force 'test' environmet
process.env.NODE_ENV = 'test';

// get the application and some utils to test it
var app = require('./../server')
  , iai = require('./../iai')
  , Browser = require('zombie')
  , assert = require('assert')
  , util = require('util')
;

// describe the test
describe('get a 404 page', function() {
  before(function(done){
    this.server = iai.start(app, done);
  });
  before(function(done){
    this.browser = new Browser();

    this.browser
      .visit(this.server.url+'/provoca-un-404')
      .finally(done)
  });

  it('should report an error', function(){
    assert.ok(util.isError(this.browser.error), "browser.error is not an error");
  });

  it('should has 404 status', function(){
    assert.ok(this.browser.statusCode == 404, "Browser status: "+this.browser.statusCode);
  });

  it('should prompt a not found message on the body', function(){
    assert.ok(this.browser.html().search(/not found/i) > -1, "browser.html(): "+this.browser.html());
  });

  after(function(done) {
    this.browser.close();
    this.server.close(done);
  });
});
