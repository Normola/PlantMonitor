// var server = require('./lib/server.js');
// var fs = require('fs');

// var ssl = {
// 	'active': true,
// 	'key': '../keys/key',
// 	'cert': '../keys/certificate'
// };

// var settings = { 'ssl': ssl };

// server.create
// //console.log(server);
// //setup(ssl);
// //server.setup(ssl);

// //var fs = require('fs');

// // function setup(ssl) {
// // 	if (ssl && ssl.active) {
// // 		return {
// // 			key : fs.readFile(ssl.key),
// // 			cert : fs.readFile(ssl.certificate)
// // 		};
// // 	}
// // }

// // function start(app, options) {
// // 	if (options) {
// // 		return require('https').createServer(options, app);
// // 	}

// // 	return require('http').createServer(app);
// // }

// // module.exports = {
// // 	create: function (settings, app, cb) {
// // 		var options = setup(settings.ssl);
// // 		return start(app, options).listen(settings.port, cb);
// // 	}
// // }