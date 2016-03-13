'use strict'

const hapi 			= require('hapi');
const inert 		= require('inert')
const httpsRedir 	= require('./httpsRedir.js')
const fs 			= require('fs');

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0"
var config = {
	host: host,
	https: {
		port: port
	}
};


const server = new hapi.Server();

server.connection({
	host: config.host,
	port: config.https.port
});

server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server is running at: ' + server.info.uri);
});

server.register([require('inert'), require('./httpsRedir').register], (err) => {
	if (err) {
		console.error("Failed to load plugin", err);
		throw err;
	}
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


server.route({
	method: 'GET',
	path: '/hello',
	handler: function(request, reply) {
		reply.file('./public/hello.html');
	}
});

server.route({
	method: 'GET',
	path: '/headers',
	handler: function(request, reply) {
		reply("Headers: </br><quote>" + JSON.stringify(request.headers) + "</quote>");
	}
})

module.exports = {
	server
};