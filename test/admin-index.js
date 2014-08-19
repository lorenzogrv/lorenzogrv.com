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
describe('admin home page', function() {
  before(function(done){
    this.server = iai.start(app, done);
  });
  before(function(done){
    this.browser = new Browser();

    this.browser
      .visit(this.server.url+'/admin')
      .finally(done)
  });
  it('should test the admin index page');
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
