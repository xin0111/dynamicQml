var sVars = require('./common.js');
var host = sVars.sUdpSendTo;
var myUtil = require('./myutil');

var sendMsg = myUtil.getCmdArgv(0);

var port = 45454

var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.bind(function () {
  socket.setBroadcast(true);
});

var message = new Buffer(sendMsg);
socket.send(message, 0, message.length, port, host, function(err, bytes) {
	if (err) {
		throw err;
	}
	console.log ('UDP message send to：' + host + ':' + port);

  socket.close();
});