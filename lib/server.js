var fs = require('fs');

function setup(ssl) {
	if (ssl && ssl.active) {
		return {
			key : fs.readFile(ssl.key),
			cert : fs.readFile(ssl.certificate)
		};
	}
}

function start(app, options) {
	console.info("Starting Server.");
	if (options) {
		console.log("Creating HTTPS server")
		return require('https').createServer(options, app);
	}

	console.log("Creating HTTP server")
	return require('http').createServer(app);
}

module.exports = {
	create: function (settings, app, cb) {
		var options = setup(settings.ssl);

		console.info("Listening on " + settings.port);
		console.info("Callback is: " + cb)
		return start(app, options).listen(settings.port, cb);
	}
}