const express = require('express');
const app = express();
const server = require('http').Server(app);
require('./higher').initialize(server);
const io = require('./higher').io
const { makeExecutableSchema } = require('graphql-tools');
//const { server, io } = require('./higher.js');
const cors = require('cors');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { graphql } = require('graphql');


const bodyParser = require('body-parser');

const typeDefs = require('./../controller/graphqlSchema.js');
const { resolvers, directiveResolvers }  = require('./../controller/resolvers.js');
const rdl = require('./rdl');

// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	directiveResolvers
});

app.use('*', cors({ origin: 'http://localhost:8080' }));
app.use('*', bodyParser.json());
app.use('*', bodyParser.urlencoded({extended: true}));

// The GraphQL endpoint
app.use('/graphql', graphqlExpress({
	schema: schema,
	formatResponse(res) {
		for (hashKey in rdl.queue) {
			const query = async (str, hashKey) => {
				graphql(schema, str)
					.then(data => {
						io.sockets.emit(hashKey, data)
					})
			}
			query(rdl.subscriptions[hashKey], hashKey)
		}
		return res;
	}
}));


app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));


server.listen(3000, () => {
	console.log('GraphQL Server is now running on http://localhost:3000');
});

//loads bundle
app.use(express.static(__dirname + './..public'));



