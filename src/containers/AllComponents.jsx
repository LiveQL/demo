import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client/index'
import { InMemoryCache } from 'apollo-cache-inmemory/lib/index'

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

//socket client
import SocketIOClient from 'socket.io-client';

//import { subscribeToTimer } from './../../subscribeToTimer';
import openSocket from 'socket.io-client';

// Create an http link:
const httpLink = new HttpLink({
	uri: 'http://localhost:3000/graphql'
});

//Create a WebSocket link:
// const wsLink = new WebSocketLink({
// 	uri: 'ws://localhost:3000/',
// 	options: {
// 		reconnect: true
// 	}
// });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const link = split(
// 	// split based on operation type
// 	({ query }) => {
// 		const { kind, operation } = getMainDefinition(query);
// 		return kind === 'OperationDefinition' && operation === 'subscription';
// 	},
// 	wsLink,
// 	httpLink,
// );


////working app /////

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

const queries = {};

queries.getAllTopics = gql`query {
															  getAllTopics {
															    content
															    topic
															    comments {
															      author
															      topic
															      text
															      netScore
															    }
															  }
															}`;
queries.getAllUsers = gql `query {
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
													}`;

//Lead Component
class App extends Component {
	constructor() {
		super();
		this.state = {
			'topics': null,
			'users': null,
			username: 'no timestamp yet',
			endpoint: 'http://localhost:3000'
		};

		//all function bindings
		this.getAllTopics = this.getAllTopics.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
	}

	//list of functions for components
	getAllTopics(event) {
		client.query({ query: queries.getAllTopics}).then((result) =>{
			let copy = this.state;
			copy.topics = result.data.getAllTopics;
			this.setState(copy);
			return 0;
		});
	}
	getAllUsers(event) {
		client.query({ query: queries.getAllUsers}).then((result) =>{
			let copy = this.state;
			console.log(result);
			copy.users = result.data.users;
			this.setState(copy);
			return 1;
		});
	}


	componentDidMount() {
		const  socket = openSocket(this.state.endpoint);
		socket.on('mutatedData', username => {
		//	if (username) {
				console.log("component did mount", username);
				this.setState({
					username: username.username
				});
			//}
		});
	}

	render() {
		console.log('state has changed right?', this.state.username);
		return (
				<div className='login-component'>
					<p className="">
						This is the timer value: {this.state.username}
					</p>
					<Header/>
					<Read getAllTopics={this.getAllTopics} getAllUsers={this.getAllUsers}/>
					<RecievedData topics={this.state.topics} users={this.state.users}/>
				</div>
		)
	}
}

///////////////////////////<<<<<<COMPONENTS>>>>>>/////////////////////////////////////////////////

class Header extends React.Component {
	render() {
		return (
			<h1>Rest In Peace Rest API's...It's GraphQL's time to Crud</h1>
		);
	}
}

class Read extends React.Component {
	render() {
			return (
				<div>
					<button onClick={this.props.getAllTopics} id={0}>Get All the Topics</button>
					<button onClick={this.props.getAllUsers} id={1}>Get All the Users</button>
				</div>
			);
		}
}

class RecievedData extends React.Component {
	render() {
		let topics;
		let users;


		if (this.props.topics) {
			topics = JSON.stringify(this.props.topics, null, 2);
		} else {
			console.log('no props in topics receiveddata');
		}

		if (this.props.users) {
			users = JSON.stringify(this.props.users, null, 2);
		} else {
			console.log('no props in users receiveddata');
		}

		return (
			<div id={this.props.id}>
				{topics}
				<br/>
				<br/>
				<br/>
				{users}
			</div>
		)
	}
}


module.exports = {
	app: App,
	apolloClient: client,
}
