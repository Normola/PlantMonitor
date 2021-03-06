var assert 	= require('chai').assert,
    expect	= require('chai').expect,
    request = require('request');

var server 	= require('../libs/server.js');

describe('Server', function() {

	describe('With Auth', function() {
		var url = 'http://localhost:3000';
		var bearerToken = 'Bearer abc456789';

		it('should Get 200 from HTTP GET / ', function(done) {
			request({
				headers: {
					'Authorization': bearerToken
				},
				uri: url + '/',
				method: 'GET'
			},
			function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
	 		});
		});

		it('should get Boink! from HTTP GET /', function(done) {
			request({
				headers: {
					'Authorization': bearerToken
				},
				uri: url +'/',
				method: 'GET'
			},
			function(error, response, body) {
				expect(body).to.equal('Boink!');
				done();
			});
		});

		it('should get 200 from HTTP static page /hello', function(done) {
			request({
				headers: {
					'Authorization' : bearerToken
				},
				uri: url + '/hello',
				method: 'GET'
			},
			function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should get Hello! from HTTP static page /hello', function(done) {
			request({
				headers: {
					'Authorization': bearerToken
				},
				uri: url + '/hello',
				method: 'GET'
			},
			function(error, response, body){
				expect(body).to.equal('Hello!');
				done();
			});
		});
	});

	describe('Without Auth', function() {
		var url = 'http://localhost:3000';

		it('should Get 401 from HTTP GET / ', function(done) {
			request(url + '/', function(error, response, body) {
				expect(response.statusCode).to.equal(401);
				done();
			});
		});

		it('should get error from HTTP GET /', function(done) {
			request(url + '/', function(error, response, body) {
				expect(body).to.equal('{"statusCode":401,"error":"Unauthorized","message":"Missing authentication"}');
				done();
			});
		});

		it('should get 401 from HTTP static page /hello', function(done) {
			request(url + '/hello', function(error, response, body) {
				expect(response.statusCode).to.equal(401);
				done();
			});
		});

		it('should get error from HTTP static page /hello', function(done) {
			request(url + '/hello', function(error, response, body) {
				expect(body).to.equal('{"statusCode":401,"error":"Unauthorized","message":"Missing authentication"}');
				done();
			});
		});
	});
});
