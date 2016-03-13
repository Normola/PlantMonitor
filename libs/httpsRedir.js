'use strict'

exports .register = function (server, options, next) {

	server.ext('onRequest', function (request, reply) {
		if (request.headers['x-forwarded-proto'] == 'http') {
			console.log(JSON.stringify(request));
			return reply()
				.redirect('https://' + request.headers.host + request.uri.path)
				.code(301);
		}
		reply.continue();
	})

	next();
}




exports.register.attributes = {
    pkg: require('../package.json')
};
