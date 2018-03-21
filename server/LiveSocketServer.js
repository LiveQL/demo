
//const server = require('http').Server(app);
const sio = require('socket.io');
const rdl = require('./rdl');
const { graphql } = require('graphql');

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

//we built this emit function based on the assumption
//that max and andrew were decent developers
//and structured the rdl like this: 	hashedOneQuery: {
// RDL.subscriptions = {
// 	hashedTwoQuery: {
// 		query: "query { getAllTopics { _id topic }}",
// 		subscribers: 30
// 	}
// };

liveServer.emit = (schema) => {
	for (hashKey in rdl.queue) {
		const query = async (rdlHash, hashKey) => {
			graphql(schema, rdlHash.query)
				.then(data => {
					liveServer.io.sockets.emit(hashKey, data)
				})
		}
		query(rdl.subscriptions[hashKey], hashKey)
	}
}




module.exports = liveServer;

//module.exports = { server, io };
//module.exports = { express, app, server, io };
