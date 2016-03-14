'use strict'

var q = require('q');
var area = 'api';

function addAPIKey(key, expire, client) {
  return q.Promise(function(resolve, reject, notify) {
    client.multi()
      .setex(area + ':keys:' + key, expire, key)
      .sadd(area + ':keys:' + area + ':keys:' + key)
      .expire(area + ':keys', expire)
      .exec(function(err) {
        if (err){
          reject(err);
        }
        else {
          resolve();
        }
      });
  });
}

function checkAPIKey(checkKey, client) {
  return q.Promise(function(resolve, reject, notify) {
    client.get(checkKey + ':keys', function(err, key) {
      if (err) {
        reject(err);
      }
      if(key == null) {
        reject('Key is null');
      }
      resolve( { fs: JSON.parse(key) } );
    });
  });
}

function deleteAPIKey(key) {
  return q.Promise(function(resolve, reject, notify) {
    client.srem(area + ':keys', area + ':keys:' + key, function(err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
   checkAPIKey: checkAPIKey,
   addAPIKey: addAPIKey,
   deleteAPIKey: deleteAPIKey

 };
