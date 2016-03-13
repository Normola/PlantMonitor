var assert  = require('assert'),
    client  = require('fakeredis'),
    repo    = require('../data/repository');

describe('Repository Test', function() {
  beforeEach(function(){
    client.flushdb();
  });
  afterEach(function(){
    client.flushdb();
  });

  if('addAPIKey should add an API key', function(done) {
    var key ='12345abcde'
    var keyCheck = repo.addAPIKey(key, 0);
    keyCheck.done(function(){
      client.get('api:keys:' + key, function(err, data){
        assert.equal(data, key);
        done();
      });
    });

  });
});
