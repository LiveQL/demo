const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const { graphql } = require('graphql');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./../controller/resolvers.js');
const typeDefs = require('./../controller/graphqlSchema.js');
// const liveServer = require('./../liveql_modules/liveqlResponse.js')

const { liveqlProcess, liveqlServer, liveqlSocket, liveqlResolver, liveqlConfig } = require('liveql');

const app = express();
const server = require('http').Server(app);


const directiveResolvers = {
  live: liveqlResolver,
};

const schema = makeExecutableSchema({ typeDefs, resolvers, directiveResolvers });

// Create the LiveQL socket server.
liveqlSocket(server, schema);

app.use('*', cors({ origin: 'http://localhost:8080' }));
app.use('*', bodyParser.json());
app.use('*', bodyParser.urlencoded({ extended: true }));

// app.use('/graphql',  graphqlExpress({ 
//   schema: schema,
//   formatResponse(res){

//     const query = `
//     query { getAllTopics {
//       _id
//       topic
//       comments {
//         _id
//         author
//         topicId
//         text
//         netScore
//       }} 
//     }`;

//     graphql(schema, query)
//       .then(data => {
//         liveServer.io.sockets.emit('triggerRefresh', data)
//     })
//     return res;
//   }
// }));
liveqlConfig.set({ uid: '_id' });
app.use('/graphql', liveqlProcess, liveqlServer({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(3000, () => console.log('GraphQL is now running on http://localhost:3000'));

app.use(express.static(__dirname + './..public')); //loads bundle
