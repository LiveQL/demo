let makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
let express = require('express');
let cors = require('cors');
let app = express();
let graphiqlExpress = require('graphql-server-express').graphiqlExpress;
let graphqlExpress = require('graphql-server-express').graphqlExpress;
let bodyParser = require('body-parser');


const typeDefs = require('./../controller/graphqlSchema.js');
const resolvers = require('./../controller/resolvers.js');

// Put together a schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use('*', cors({ origin: 'http://localhost:8080' }));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));


app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));


// Wrap the Express server
//const ws = createServer(app);
app.listen(3000, () => {
	console.log('GraphQL Server is now running on http://localhost:3000');
});

//app.use(express.static(__dirname + './..public'));