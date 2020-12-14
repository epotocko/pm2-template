#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');

console.log("NODE_ENV = " + (process.env.NODE_ENV || 'development'));

var app = express();
app.enable('trust proxy'); // So we get the right ip address from req.ip

// Parse url-encoded POST bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/ping', function (req, res) {
	res.send('OK');
});

app.get('/sleep', function(req, res, next) {
	var t = req.query.t ? parseInt(req.query.t) : 5;
	setTimeout(function() {
		res.send('OK');
		next();
	}, t * 1000);
});

const server = require('http').createServer(app);
server.listen(3000, () => { 
	console.info("Server is running");
	// Let PM2 know the process is ready to receive requests
	process.send('ready');
});

process.on('SIGINT', () => {
	//console.info('SIGINT signal received.')
	// Stops the server from accepting new connections and finishes existing connections.
	server.close(function(err) {
		console.info("Server has closed");
		if(err) console.error(err);
		process.exit(err ? 1 : 0);
	});
});

module.exports = server;
