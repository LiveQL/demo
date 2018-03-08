import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
const App = require('./containers/App.js').app;
const client = require('./containers/App.js').apolloClient;


ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
	document.getElementById('root')
)




