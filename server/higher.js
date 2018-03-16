
//const server = require('http').Server(app);
const sio = require('socket.io');
const rdl = require('./rdl');

const liveServer = {};

liveServer.io = null;

liveServer.instatiateIO = function () {
	return liveServer.io;
};


liveServer.initialize =  (server) => {
	liveServer.io = sio(server);

	liveServer.io.on('connection', function (socket) {
		socket.on('unload', function (data) {
			data.forEach(handle => {
				rdl.subscriptions[handle].subscribers--;
			});
		});
	});
}




module.exports = liveServer;

//module.exports = { server, io };
//module.exports = { express, app, server, io };
