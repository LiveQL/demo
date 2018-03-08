import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
const App = require('./containers/App.js').app;
const client = require('./containers/App.js').apolloClient;
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>,
	document.getElementById('root')
)




