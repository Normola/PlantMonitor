var server = require('../lib/server');

describe('server', function() {
	before(function() {
		server.listen(3000);
	});

	after(function() {
		server.close();
	});
});	

var assert = require('assert'),
	http = require('http');

describe('/', function() {
	it('should return 200', function(done) {
		http.get('http://localhost:3000', function(res) {
			assert.equal(200, statusCode);
			done();
		});
	});

	it('should say \'Boink\'', function(done) {
		http.get('http://localhost:3000', function(res) {
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