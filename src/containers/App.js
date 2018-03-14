import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
require('isomorphic-fetch');
import liveClient from './socketConnection';
//import SocketIOClient from 'socket.io-client';

//what we need to do it update the state on the graphql calls- every mutation updates state and
//whatrennders to the dom is dependent on simple state conditional logic,
//right now our 'consoles' from the live directive cannot update state, thus cannot change the net score on page.

class Container extends React.Component {
	constructor() {
		super();
		this.state = {
      onComment: false,
      value: '',
			socketHandle: null
		};

		this.like = this.like.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.createTopic = this.createTopic.bind(this);
		this.fetchTopic = this.fetchTopic.bind(this);
		this.commentMutation = this.commentMutation.bind(this);
		this.alterStateAfterMutation = this.alterStateAfterMutation.bind(this);
		this.basketballChannel = this.basketballChannel.bind(this);
		this.renderDataToScreen = this.renderDataToScreen.bind(this);
		this.cricketChannel = this.cricketChannel.bind(this);
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

	alterStateAfterMutation(mutationType, newState) {
	  this.setState(newState);
  }

  like(e) {
	  e.preventDefault();
    const _id = e.target.id;
    this.props.increaseLikes({
      variables: { _id },
    })
      .then(({ data }) => {
        //console.log('data', data)
      }).catch(err => console.log('nope', err))
  }

	commentMutation(e) {
	  e.preventDefault();
	  const { _id } = this.state.onComment.getASingleTopic;
    this.props.addComment({
      variables: { topicId: _id, author: 'xavyr', text: this.state.value },
      // refetchQueries: [{ query: Topics }]
    })
        .then(({ data }) => {
          this.setState({value : ''});
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
        	// i set the state to have list of current comments for easy grab when we fire a socket
	        let copy = this.state;
	        copy.onComment = res.data;
	        //copy.socketHandle = 'mutatedData';
          this.setState(copy);
	        this.basketballChannel('mutatedData', res.data);
	      })
  }

  renderDataToScreen(data) {
	  if (data.netScore !== 0) {
		  let stateCopy =  Object.assign({}, this.state);
		  let allComments = stateCopy.onComment.getASingleTopic.comments;
		  let changedComments = allComments.map(comment => {
			  if (comment._id === data._id) {
				  return data;
			  } else {
				  return comment;
			  }
		  })
		  stateCopy.onComment.getASingleTopic.comments = changedComments;
		  this.alterStateAfterMutation('addedLike', stateCopy);
	  } else if (data.netScore === 0) {
		  let stateCopy =  Object.assign({}, this.state);
		  stateCopy.onComment.getASingleTopic.comments.push(data);
		  this.alterStateAfterMutation('addedMessage', stateCopy);
	  }
  }

	basketballChannel(socketHandler) {
		liveClient.on(socketHandler, this.renderDataToScreen);
	}

	cricketChannel(socketHandler) {
		liveClient.on('second', function (data) {
			console.log(data);
		});

	}

	// Lifecycle Methods
	componentDidMount() {
		liveClient.connect('http://localhost:3000');
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
              <button onClick={this.fetchTopic} className={'topic' + _id} id={_id}>{topic}</button>
              <br/><br/><br/>
            </div>
        ))
        return (
            <div>
              <h1>LiveQL Demo</h1>
              <ul>
                {topicItems}
              </ul>
            </div>
        )
      } else if (this.state.onComment) {
      	let stateCopy = this.state.onComment.getASingleTopic.comments.slice();
        const comments = stateCopy.map(({_id, text, author, netScore}) => (
            <div>
              {author}: {text} <button className={'likeB' + _id} id={_id} onClick={this.like}>Like</button> {netScore}
              <br/><br/>
            </div>
        ));
        return (
          <div>
            <button onClick={() => this.setState({ onComment: false })} value='Home'>Home</button>
            <h1>{this.state.onComment.getASingleTopic.topic}</h1>
            <ul>
              {comments}
	            <button onClick={this.cricketChannel}>testF</button>
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