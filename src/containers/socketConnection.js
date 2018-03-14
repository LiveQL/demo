//web socket on mount stuff
import SocketIOClient from 'socket.io-client'

const socket = SocketIOClient.connect('http://localhost:3000');


const connectionFunctions = {};

const handles = [];

window.addEventListener("beforeunload", function (event) {
	console.log('this ran')
	socket.emit('unload', handles)
})

connectionFunctions.on = (socketHandler, callback) => {
	handles.push(socketHandler)
	socket.on(socketHandler, (data) => {
		//they are going to pass in their function to be called when data arrives
		callback(data);
	});

}

module.exports = { socket, connectionFunctions };