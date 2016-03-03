function plantMonitor(req, res) {
	
	console.info("Setting up PlantMonitor listener");

	req.on("data", onData);
	req.on("end", end);


	res.writeHead(200, { 'Content-Type' : 'text/plain' });
	res.end("Boink!");
}

function plantMonitorCallback(data) {
	console.log('Callback! ' + data);
}

function onData(data) {
	console.info("Got data " + data);
}

function end() {
	console.info("Server ended.");
}

module.exports = {
	plantMonitor:plantMonitor, plantMonitorCallback: plantMonitorCallback
};