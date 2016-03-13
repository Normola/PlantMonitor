'use strict'

const httpsRedir = { 
	register: function(server, options, next) {
	
		server.ext('onRequest', function (request, response) {
			if (request.headers['x-forwarded-proto'] == 'http') {
				return reply()
					.redirect('https://' + request.headers.host + request.uri.path)
					.code(301);
			}
			reply.continue();
		})

		next();
	}
}


httpsRedir.register.attributes = {
    name: 'httpsRedir',
    version: '1.0.0'
};
