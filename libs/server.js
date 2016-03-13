'use strict'

const hapi = require('hapi');
const inert = require('inert')
const fs = require('fs');

var config = {
	host: 'localhost',
	https: {
		port: '3000',	
		key: fs.readFile('/home/jim/Dev/keys/server-key.pem'),
		cert: fs.readFile('/home/jim/Dev/keys/server-cert.pem')
	}
};


const server = new hapi.Server();

server.connection({
	host: config.host,
	port: config.https.port,
	// tls: {
	// 	key: config.https.key,
	// 	cert: config.https.cert
	// }
});

server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server is running at: ' + server.info.uri);
});


server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply('Boink!');
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function(request, reply) {
		reply('Boink - ' + encodeURIComponent(request.params.name) + '!')
	}
});

server.register(inert, (err) => {
	if (err) {
		throw err;
	}

	server.route({
		method: 'GET',
		path: '/hello',
		handler: function(request, reply) {
			reply.file('./public/hello.html');
		}
	})
});

module.exports = {
	server
};