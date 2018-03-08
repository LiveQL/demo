import React, { Component } from 'react';

class RecievedData extends React.Component {
	render() {
		let topics;
		let users;

		if (Array.isArray(this.props.topics)) {
			const listItems = this.props.topics.map(({topic, comments}, ind) => {
				return (
					<div className='topic'>
						<li key={topic}>{topic}</li>
					</div>
				);
			})
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
export default RecievedData;