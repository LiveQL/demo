import React, { Component } from 'react';

class Read extends Component {
	render() {
		return (
			<div className="ReadButtons">
				<button onClick={this.props.getAllTopics} id={0}>Get All the Topics</button>
				<button onClick={this.props.getAllUsers} id={1}>Get All the Users</button>
			</div>
		);
	}
}
export default Read;