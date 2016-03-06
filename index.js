var fs 			= require('fs'),
	express		= require('express'),
	osHomedir 	= require('os-homedir'),
	helmet 		= require('helmet'),
	https 		= require('https'),
	bodyParser	= require('body-parser');

var keyDir 	= osHomedir() + '/Dev/keys/';
var app 	= express();


app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'API router is working.'});
});

app.use('/api', router);

// #TODO: Drive these in a different way. 
var options = {
	key: keyDir + 'server-key.pem',
	cert: keyDir + 'server-crt.pem',
	ca: keyDir + 'ca-crt.pem',
	requestCert: true,
	rejectUnauthorized: false,
	port: 3000
};

ssl = {
		key : fs.readFileSync(options.key),
		cert : fs.readFileSync(options.cert),
		ca: fs.readFileSync(options.ca),
		requestCert: options.requestCert,
		rejectUnauthorized: options.rejectUnauthorized
	};

https.createServer(ssl, app).listen(options.port);

// app.get('/', function(req, res) {
// 	if (req.client.authorized){
// 		console.log("Yay!");
// 		res.send("Test");
// 	}
// 	else {
// 		console.log("Rejected.");
// 		res.send("Not Authed");
// 	}
// });
