import React, { Component } from 'react';
import TopicItems from "../components/TopicItems";

class TopicPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
		this.addItem = this.addItem.bind(this);
	}
	addItem(e) {
		let itemArray = this.state.items;
		if(this.inputElement.value !== '') {
			itemArray.unshift({
				text: this.inputElement.value,
				key: Date.now()
			})
			this.setState({
				items: itemArray
			})
			this.inputElement.value = "";
		}
		e.preventDefault()
	}

	render() {
		return (
		<div className="main-list">
			<div className="question">
				Should X buy new jeans? 
				<form className='form' onSubmit={this.addItem}>
					<input ref={(a) => this.inputElement = a}  placeholder="enter task"></input>
					<button type="submit">Add</button> 
				</form>
			</div>
			<TopicItems entries={this.state.items} delete={this.deleteItem} />
		</div>
		);
	}
}
export default TopicPage;