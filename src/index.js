import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
//the lead component
let App = require('./containers/AllComponents.jsx').app;
//the Apollo Client
let client = require('./containers/AllComponents.jsx').apolloClient;


ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
	document.getElementById('root')
)


