/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Grid } from 'semantic-ui-react';
import { getCategories } from '../actions';
import Map from './Map';

const ItemDetails = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);

	useEffect(() => {
		getCat();
	}, []);

	const getCat = async () => {
		const response = await fetch('http://localhost:3000/api/v1/categories');
		const data = await response.json();
		dispatch(getCategories(data));
	};

	return (
		<Grid textAlign="center" verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 850 }}>
				<br></br>
				<br></br>
				<br></br>
				<Form color="green">
					<Form.Field>
						<label>Title</label>
						<input
							placeholder="Title"
							// onChange={this.props.handleChange('firstName')}
						/>
					</Form.Field>
					<Form.Field>
						<label>Description</label>
						<textarea placeholder="Tell us more" rows="3"></textarea>
					</Form.Field>
					<Form.Select
						fluid
						label="Category"
						options={categories.categories.map((cat) => {
							return {
								key: cat.id,
								text: cat.category,
								value: cat.category
							};
						})}
						placeholder="Select a Category"
					/>
					<div style={{ margin: '100px' }}>
						<Map
							// google={this.props.google}
							center={{ lat: 30.26715, lng: -97.74306 }}
							height="300px"
							zoom={15}
						/>
					</div>

					<Button>Save and Post</Button>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

export default ItemDetails;
