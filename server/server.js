const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');



const typeDefs = require('./../controller/graphqlSchema.js');
const resolvers = require('./../controller/resolvers.js');

// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use('*', cors({ origin: 'http://localhost:8080' }));

//loads bundle
app.use(express.static(__dirname + './..public'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));


app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));


// Wrap the Express server
//const ws = createServer(app);
server.listen(3000, () => {
	console.log('GraphQL Server is now running on http://localhost:3000');
});

// websocket.on('connection', (socket) => {
// 	console.log('A client just joined on ', socket.id );
// });
