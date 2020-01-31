import React, { Component } from 'react';
import ItemCard from './ItemCard';

class ItemBrowser extends Component {
	state = {
		visible: false,
		posts: {}
	};

	async componentDidMount() {
		const response = await fetch('http://localhost:3000/api/v1/posts');
		const data = await response.json();
		this.setState({ posts: data }, console.log(this.state.posts));
	}

	render() {
		return (
			<div className="ui grid container">
				{this.state.posts.map((post) => (
					<ItemCard post={post} />
				))}
			</div>
		);
	}
}
export default ItemBrowser;
