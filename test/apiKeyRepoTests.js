var assert 	  = require('chai').assert,
    expect	 = require('chai').expect,
    client    = require('fakeredis').createClient('test', { fast: true }),
    repo      = require('../libs/apiKeyPromises'),
    crypto    = require('crypto'),
    base64url = require('base64url'),
    q         = require('q');


function getRandomAPIKey(size) {
  if (!size)
  {
    size = 48;
  }
    return base64url(crypto.randomBytes(size));
}

function addAndCheckKey(key) {
  return new q.Promise(function(resolve, reject) {
    if (!key)
    {
      key = getRandomAPIKey();
    }

    var addKey = repo.addAPIKey(key, 3600, client);
    addKey.done(function() {
      var checkKey = repo.checkAPIKeyExists(key, client);
      checkKey.done(function(data) {
        resolve(data);
      });
    });
  });
}

describe('Repository Test', function() {
  beforeEach(function(){
    client.flushdb();
  });
  afterEach(function(){
    client.flushdb();
  });

  it('addAPIKey should add an API key', function(done) {
    var key = getRandomAPIKey();
    var addKey = repo.addAPIKey(key, 3600, client);
    addKey.done(function() {

      client.get('api:keys:' + key, function(err, data){
        expect(key).to.equal(data);
        done();
      });
    });
  });

  it('checkAPIKey should return true when exists', function(done) {
    var checkKeyCreated = addAndCheckKey();

    checkKeyCreated.done(function(keyCreated) {
      expect(keyCreated).to.equal(true);
      done();
    });
  });

  it('checkAPIKey should return false when not exists', function(done) {
    var key = getRandomAPIKey();
    var checkKey = repo.checkAPIKeyExists(key, client);
    checkKey.done(function(keyCreated) {
      expect(keyCreated).to.equal(false);
      done();
    });
  });

  it('deleteAPIKey should delete a key when key exists', function(done) {
    var key = getRandomAPIKey();
    var checkKeyCreated = addAndCheckKey(key);

    checkKeyCreated.done(function(checkKey) {
      expect(checkKey).to.equal(true);
      var deleteKey = repo.deleteAPIKey(key, client);
      deleteKey.done(function() {
        var checkKey = repo.checkAPIKeyExists(key, client);
        checkKey.done(function(data) {
          expect(data).to.equal(false);
          done();
        });
      });
    });
  });
});
