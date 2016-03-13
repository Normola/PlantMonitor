
var assert 	= require('chai').assert;
var expect	= require("chai").expect;
var request = require("request");

var server 	= require('../libs/server.js');

describe('Server', function() {

	describe('HTTPS Server', function() {
		var url = 'https://localhost:3000';

		it('should Get 200 from HTTPS GET / ', function(done) {
			request(url + '/', function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should get Boink! from HTTPS GET /', function(done) {
			request(url + '/', function(error, response, body) {
				expect(body).to.equal('Boink!');
				done();	
			});
		});

		it('should get 200 from HTTPS static page /hello', function(done) {
			request(url + '/hello', function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should get Hello! from HTTPS static page /hello', function(done) {
			request(url + '/hello', function(error, response, body) {
				expect(body).to.equal('Hello!');
				done();	
			});
		});
	});

});