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
describe('admin login page', function() {
  before(function(done){
    this.server = iai.start(app, done);
  });
  before(function(done){
    this.browser = new Browser();

    this.browser
      .visit(this.server.url+'/admin')
      .finally(done)
  });

  it('should test the admin auth system')

/*  it('should redirect to the admin login')
  it('should display the login form')
  it('should not validate without all fields filled up')
  it('should not validate if password or user dont match')
  it('should validate if all fields are correct')
  it('should redirect to the admin home on success')
*/
  after(function(done) {
    this.browser.close();
    this.server.close(done);
  });
});
