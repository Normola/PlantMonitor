'use strict'

var q = require('q');
var area = 'api';

function addAPIKey(key, expire, client) {
  return q.Promise(function(resolve, reject, notify) {
    client.set('api:keys:' + key, key, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function checkAPIKeyExists(checkKey, client) {
  return q.Promise(function(resolve, reject, notify) {
    client.get('api:keys:'+ checkKey, function(err, key) {
      if (err) {
        reject(err);
      }
      if (key==null) {
        resolve(false);
      }
      resolve( true );
    });
  });
}

function deleteAPIKey(key, client) {
  return q.Promise(function(resolve, reject, notify) {
    client.del('api:keys:' + key, function(err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
   checkAPIKeyExists: checkAPIKeyExists,
   addAPIKey: addAPIKey,
   deleteAPIKey: deleteAPIKey

 };
