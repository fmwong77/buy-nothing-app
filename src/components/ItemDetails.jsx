import React, { useEffect, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { getCategories } from '../actions';
import categoryReducer from '../reducers/category';

class ItemDetails extends Component {
	// const dispatch = useDispatch();
	// const categories = useSelector((state) => state.category);
	// let categories = [];

	// useEffect(() => {
	// 	getCat();
	// });

	constructor() {
		super();
		this.state = { categories: [] };
	}

	async componentDidMount() {
		const response = await fetch('http://localhost:3000/api/v1/categories');
		const data = await response.json();
		this.setState({ categories: data }, console.log(this.state.categories));
	}

	// createOption = () => {
	// 	console.log(this.state.categories);
	// 	const catArray = this.state.categories.map((cat) => {
	// 		return {
	// 			key: cat.id,
	// 			text: cat.category,
	// 			value: cat.category
	// 		};
	// 	});
	// 	return catArray;
	// };

	render() {
		return (
			<Form size="medium" color="green">
				<h1 className="ui centered">Enter Item Details</h1>
				<Form.Field>
					<label>Title</label>
					<input
						placeholder="Title"
						// onChange={this.props.handleChange('firstName')}
					/>
				</Form.Field>
				<Form.Field>
					<label>Description</label>
					<input
						placeholder="Description"
						// onChange={this.props.handleChange('lastName')}
					/>
				</Form.Field>
				<Form.Select
					fluid
					label="Category"
					options={this.state.categories.map((cat) => {
						return {
							key: cat.id,
							text: cat.category,
							value: cat.category
						};
					})}
					placeholder="Select a Category"
				/>
				<Button>Save and Post</Button>
			</Form>
		);
	}
}

export default ItemDetails;
