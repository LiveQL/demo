import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory/lib/index'
import { HttpLink } from 'apollo-link-http/lib/index'
import App from './containers/App.js'

const httpLink = new HttpLink({
	uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});



ReactDOM.render(
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>,
	document.getElementById('root')
)




