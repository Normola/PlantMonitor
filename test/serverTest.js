var server = require('../lib/server'),
	assert = require('assert'),
	http = require('http'),
	pm = require("../lib/plantmonitor-esp.js");

var ssl = {
	'active': false,
	'key': '../keys/key',
	'cert': '../keys/certificate'
};

var port = 3000;
var settings = { 'port': port, 'ssl': ssl };
var conn = "";

describe('httpServer /', function() {
	
	before(function() {
		console.info("Starting Test Server");
		console.info(pm.plantMonitorCallback);
		conn = server.create(settings, pm.plantMonitor, pm.plantMonitorCallback);
	});

	after(function() {
		console.info("Killing Test Server");
		conn.close();
	});

	it('should return 200', function(done) {
		http.get('http://localhost:' + port + '/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});

	it('should say \'Boink\'', function(done) {
		http.get('http://localhost:' + port, function(res) {
			var data = '';

			res.on('data', function(chunk) {
				data += chunk;
			});

			res.on('end', function() {
				assert.equal('Boink!', data);
				done();
			});
		});
	});
});