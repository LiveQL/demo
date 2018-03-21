import React, { Component } from 'react';
require('isomorphic-fetch');


class Counter extends React.Component {
  constructor() {
    super();
    this.state = {}
    this.increment = this.increment.bind(this)
  }

  increment(e) {
    e.preventDefault();
    //cleaned the id of 'like' which nightmare needed for headless browser
    const _id = e.target.id.split('like')[1];
    const increaseLikes = `
    mutation increaseLikes($_id: String!) {
      increaseLikes(_id: $_id) {
        _id
        topicId
        author
        text
        netScore
      }
    }
    `;
  
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: increaseLikes,
        variables: { _id }
      }),
    })
    .then(res => res.json())

  }

	render() {
    return (
        <span> 
          <button className='like-button' id={'like'+this.props.id} onClick={this.increment}>Like {this.props.likeCount}</button>
				</span>
			);
  }
}

export default Counter;