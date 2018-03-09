import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
require('isomorphic-fetch');
//import SocketIOClient from 'socket.io-client';

class Container extends React.Component {
	constructor() {
		super();
		this.state = {
      onComment: false,
      value: '',
		};

		this.like = this.like.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.createTopic = this.createTopic.bind(this);
		this.fetchTopic = this.fetchTopic.bind(this);
		this.commentMutation = this.commentMutation.bind(this);
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

	handleChange(e) {
	  this.setState({value: e.target.value})
  }

  like(e) {
	  e.preventDefault();
	  const _id = e.target.id;
    this.props.increaseLikes({
      variables: { _id },
    })
      .then(({ data }) => {
        console.log('data', data)
      }).catch(err => console.log('nope', err))
  }

	commentMutation(e) {
	  e.preventDefault();
	  const { _id } = this.state.onComment.getASingleTopic;
	  console.log(this.state.value, _id)
    this.props.addComment({
      variables: { topicId: _id, author: 'Gravitar', text: this.state.value },
      // refetchQueries: [{ query: Topics }]
    })
        .then(({ data }) => {
          this.setState({value : ''});
          console.log('data', data)
        }).catch(err => console.log('nope', err))
  }

	fetchTopic(e) {
		e.preventDefault();

    const id = e.target.id;

    const query = `
        getASingleTopic(id: "${id}") {
          _id
          topic
          comments {
            _id
            author
            topicId
            text
            netScore
          }
        }`;

    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `{ ${query} }`}),
    })
        .then(res => res.json())
        .then((res) => {
          this.setState({onComment: res.data});
	      })
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
    const {data: {loading, error, getAllTopics}} = this.props;
    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>;
    } else {
      if (!this.state.onComment) { //!this.state.topics
        const topicItems = getAllTopics.map(({_id, topic}) => (
            <div>
              <button  onClick={this.fetchTopic} id={_id}>{topic}</button>
              <br/><br/><br/></div>
        ))
        return (
            <div>
              <h1>LiveQL Demo</h1>
                {topicItems}
            </div>
        )
      } else if (this.state.onComment) {
        const comments = this.state.onComment.getASingleTopic.comments.map(({_id, text, author, netScore}) => (
            <div className="comments">
							<div id='author'>
							{author}:  
							</div>
							{text} <button id={_id} onClick={this.like}>Like</button> {netScore}
              <br/><br/>
            </div>
        ));
        return (
          <div>
            <button onClick={() => this.setState({ onComment: false })} value='Home'>Home</button>
            <h1>{this.state.onComment.getASingleTopic.topic}</h1>
            <ul>
              {comments}
            </ul>
            <form onSubmit={this.commentMutation}>
              <input onChange={this.handleChange} value={this.state.value} placeholder='Add Comment'/>
            </form>
          </div>
        )
        };
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

const addComment = gql`
  mutation addComment($author: String!, $topicId: String!, $text: String!) {
    addComment(author: $author, topicId: $topicId, text: $text, netScore: 0) {
      topicId
      author
      text
      netScore
    }
  }
  `;

const increaseLikes = gql`
  mutation increaseLikes($_id: String!) {
    increaseLikes(_id: $_id) {
      topicId
      _id
      author
      text
      netScore
    }
  }
  `;


const statefulComp = compose(
    graphql(getAllTopics),
    graphql(addComment, { name: 'addComment' }),
    graphql(increaseLikes, { name: 'increaseLikes' })
  )(Container);

export default statefulComp;