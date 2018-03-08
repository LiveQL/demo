import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client/index'
import { InMemoryCache } from 'apollo-cache-inmemory/lib/index'
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import SocketIOClient from 'socket.io-client';
import Header from "./../components/Header.js";
import Read from "./../components/Read.js";
// import RecievedData from "./../components/RecievedData.js";
import { Switch, Route } from 'react-router-dom'
import ReceivedData from "../components/RecievedData";

const httpLink = new HttpLink({
	uri: 'http://localhost:3000/graphql'
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

const queries = {};

queries.getAllTopics = gql`
query {
	getAllTopics {
    topic
    comments {
      author
      topic
      text
      netScore
    }
  }
}
`;
queries.getAllUsers = gql`
query {
	users {
    username
    password
    comments {
      author
      topic
      text
      netScore
    }
  }
}
`;

//Lead Component
class App extends Component {
	constructor() {
		super();
		this.state = {
			'topics': null,
			'users': null
		};

		//socket stuff
		this.socket = SocketIOClient('http://localhost:3000');

		//all function bindings
		this.getAllTopics = this.getAllTopics.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
	}

	// Lifecycle Methods
	componentWillMount() {
		const socket = SocketIOClient.connect('http://localhost:3000');
		socket.on('news', function (data) {
			socket.emit('my other event', { my: 'data' });
		});
	}

	//list of functions for components
	getAllTopics(event) {
		client.query({ query: queries.getAllTopics }).then((result) => {
			let copy = this.state;
			copy.topics = result.data.getAllTopics;
			this.setState(copy);
			return 0;
		});
	}
	getAllUsers(event) {
		client.query({ query: queries.getAllUsers }).then((result) => {
			let copy = this.state;
			copy.users = result.data.users;
			this.setState(copy);
			return 1;
		});
	}


	render() {
	// 	const check = (this.state.topics) ?  />
	// 	: <RecievedData topics={this.state.topics} users={this.state.users} />;
		return (
			<div className='login-component'>
				<Header />
        <Read getAllTopics={this.getAllTopics} getAllUsers={this.getAllUsers} />
        <ReceivedData topics={this.state.topics} users={this.state.users} />

			</div>
		)
	}
}

module.exports = { app: App, apolloClient: client}
