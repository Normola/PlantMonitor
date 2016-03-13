
var assert 	= require('chai').assert;
var expect	= require("chai").expect;
var request = require("request");

var server 	= require('../libs/server.js');

describe('Server', function() {

	describe('With Auth', function() {
		var url = 'http://localhost:3000';
		var bearerToken = 'abc456789';
		var authHeader = 'Authorization: Bearer ';
		authHeader += bearerToken; 

		it('should Get 200 from HTTP GET / ', function(done) {
			request(url + '/', authHeader, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should get Boink! from HTTP GET /', function(done) {
			request(url + '/', authHeader, function(error, response, body) {
				expect(body).to.equal('Boink!');
				done();	
			});
		});

		it('should get 200 from HTTP static page /hello', function(done) {
			request(url + '/hello', authHeader, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should get Hello! from HTTP static page /hello', function(done) {
			request(url + '/hello', function(error, response, body) {
				expect(body).to.equal('Hello!');
				done();	
			});
		});
	});

	describe('Without Auth', function() {
		var url = 'http://localhost:3000';

		it('should Get 401 from HTTP GET / ', function(done) {
			request(url + '/', function(error, response, body) {
				expect(response.statusCode).to.equal(200);
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
				expect(response.statusCode).to.equal(200);
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