import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ReceivedData extends React.Component {
	render() {
		let topics;
		let users;

		if (Array.isArray(this.props.topics)) {
			const listItems = this.props.topics.map(({ topic }, ind) => {
				return <div className='topic'>
						<Link to={topic}>
							<li key={topic}>{topic}</li>
						</Link>
					</div>;
			});
			console.log('Outside map', listItems)
			return (
				<div id={this.props.id}>
					<ul>
						{topics}
						{listItems}
						{users}
					</ul>
				</div>
			)
		} 

		if (this.props.users) {
			users = JSON.stringify(this.props.users, null, 2);
		} 

		// if(listItems){
		// 	return (
		// 		<div id={this.props.id}>
		// 			{topics}
		// 			<ul>
		// 				{listItems}
		// 			</ul>
		// 		</div>
		// 	)
		// }	
			return (
				<div>
					{users}
				</div>
      );
	}
}
export default ReceivedData;