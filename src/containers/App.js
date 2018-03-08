import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
require('isomorphic-fetch');


//import SocketIOClient from 'socket.io-client';
import Header from "./../components/Header.js";
import Read from "./../components/Read.js";
import RecievedData from "./../components/RecievedData.js";


class Container extends React.Component {
	constructor() {
		super();
		this.state = {
			topics: null,
		};


		this.createTopic = this.createTopic.bind(this);
	}

	createTopic(e) {
		e.preventDefault();
		this.props.addTopic({
			variables: { author: 'Michael', topic: e.target.topic.value},
			refetchQueries: [{ query: Topics }]
		})
			.then(({ data }) => {
				document.getElementById('topic').value = '';
			}).catch(err => console.log('nope', err))

	}

	fetchTopic(e) {
		e.preventDefault();

	}

	// Lifecycle Methods
	componentWillMount() {
		console.log('here');

		//web socket on mount stuff
		// const socket = SocketIOClient.connect('http://localhost:3000');
		// socket.on('news', function (data) {
		//  socket.emit('my other event', { my: 'data' });
		// });
	}


	render() {
		const { data: { loading, error, getAllTopics } } = this.props;
		if (loading) {
			return <p>Loading...</p>;
		} else if (error) {
			return <p>Error!</p>;
		} else {
			if (false) { //!this.state.topics
				const topicItems = getAllTopics.map(({_id, topic, comments}) => (
					<div><button topicId={_id}>{topic}</button><br/><br/><br/></div>
				))
				return (
					<div>
						<h1>LiveQL Demo</h1>
						<ul>
							{topicItems}
						</ul>
					</div>
				)
			} else {
				console.log('gonna do the axios request');
				const query = `
											getASingleTopic(id: "5aa0852bb6968018e3a1fa00") {
											_id
											topic
											comments {
											_id
											author
											topicId
											text
											netScore
											}
											}`

				fetch('http://localhost:3000/graphql', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: `{ ${query} }` }),
				})
					.then(res => res.json())
					.then((res) => {
						console.log(res.data);
						const comments = res.data.getASingleTopic.comments.map(({text}) => (
							<div><button>{text}</button><br/><br/><br/></div>
						))
						return (
							<div>
								<h1>LiveQL Demo</h1>
								<ul>
									{comments}
								</ul>
							</div>
						)
					});
			}
		}
	}
}

const getAllTopics = gql`
query {
  getAllTopics {
   _id
    topic
  }
}
`;

// const statefulComp = compose(
// 	graphql(addTopic, { name: 'addTopic' }),
// 	graphql(addComment, { name: 'addComment' }),
// 	graphql(Topics)
// )(Container);

const statefulComp = compose(
	graphql(getAllTopics),
)(Container);

export default statefulComp;