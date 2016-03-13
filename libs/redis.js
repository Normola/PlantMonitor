'use strict'

var redis = require('redis');
var url 	= require('url');

const config = {
	hostname: getEnv('REDISURL') | 'localhost',
	port: getEnv('PORT') | '6379',
};

var client = redis.createClient(config.port, config.hostname);

if (config.auth != null) {
	client.auth(config.auth.split(':')[1]);
}

client.on('error', function(err) {
	console.log(err);
});

module.exports = {
	client
};
