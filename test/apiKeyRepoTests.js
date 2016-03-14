var assert 	= require('chai').assert,
    expect	= require('chai').expect,
    client  = require('fakeredis').createClient('test'),
    repo    = require('../libs/apiKeyPromises');

describe('Repository Test', function() {
  beforeEach(function(){
    client.flushdb();
  });
  afterEach(function(){
    client.flushdb();
  });

  it('addAPIKey should add an API key', function(done) {
    var key ='12345abcde'
    var keyCheck = repo.addAPIKey(key, 3600, client);
    keyCheck.done(function(){
      client.get('api:keys:' + key, function(err, data){
        expect(key).to.equal(data);
        done();
      });
    });

  });
});
