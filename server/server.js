const express = require('express');
const app = express();
const server = require('http').Server(app);
//require('./LiveSocketServer').initialize(server);
const liveSocketServer = require('./LiveSocketServer');
liveSocketServer.initialize(server);
const { makeExecutableSchema } = require('graphql-tools');
//const { server, io } = require('./higher.js');
const cors = require('cors');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');



const bodyParser = require('body-parser');

const typeDefs = require('./../controller/graphqlSchema.js');
const { resolvers, directiveResolvers }  = require('./../controller/resolvers.js');

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
		//developer must pass in our schema in order to emit as we
		//loop through our rdl
		liveSocketServer.emit(schema);
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



