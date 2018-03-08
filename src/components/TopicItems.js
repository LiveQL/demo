import React, { Component } from 'react';

class TopicItems extends Component {
	constructor(props) {
		super(props)
    this.createTasks = this.createTasks.bind(this);
	}

	createTasks(item) {
		return (
			<li key={item.key}>{item.text}</li>
		);
	}

	render() {
		const entries = this.props.entires;
		console.log(entries)
		// let listItems = entries.map(this.createTasks); 
		return ( 
		<div className="listItems">
			{/* {listItems} */}
		</div>
		);
	}
}
export default TopicItems;